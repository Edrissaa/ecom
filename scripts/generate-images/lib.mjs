// Shared helpers for the Soleva image generator.
// Everything here is deterministic: the same inputs always produce the same pixels.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/** Small seeded PRNG so film grain and scatter are reproducible. */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Wrap content in a sized SVG document. */
export function svgDoc(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`;
}

/** Monochrome noise tile used for photographic grain (soft-light blended). */
function grainTile(width, height, seed, strength) {
  const rand = mulberry32(seed);
  const data = Buffer.alloc(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    // Gaussian-ish distribution centred on mid-grey.
    const n = (rand() + rand() + rand()) / 3;
    const v = Math.round(128 + (n - 0.5) * 2 * 255 * strength);
    data[i * 3] = data[i * 3 + 1] = data[i * 3 + 2] = Math.max(0, Math.min(255, v));
  }
  return sharp(data, { raw: { width, height, channels: 3 } }).png().toBuffer();
}

/**
 * Rasterise an SVG string to WebP.
 * opts.grain: 0..1 film-grain strength (0 disables)
 * opts.quality: webp quality
 */
export async function renderWebp(svg, outFile, { width, height, grain = 0, seed = 1, quality = 80 } = {}) {
  await mkdir(path.dirname(outFile), { recursive: true });
  let img = sharp(Buffer.from(svg), { density: 72 }).resize(width, height);
  if (grain > 0) {
    const base = await img.png().toBuffer();
    const noise = await grainTile(width, height, seed, grain);
    img = sharp(base).composite([{ input: noise, blend: "soft-light" }]);
  }
  await img.webp({ quality, effort: 5 }).toFile(outFile);
}

/** Same as renderWebp but writes a PNG (used by the preview harness only). */
export async function renderPng(svg, outFile, { width, height } = {}) {
  await mkdir(path.dirname(outFile), { recursive: true });
  await sharp(Buffer.from(svg), { density: 72 }).resize(width, height).png().toFile(outFile);
}
