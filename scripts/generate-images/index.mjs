#!/usr/bin/env node
// Generates every raster image used by the storefront from code.
//
//   npm run generate:images            # everything
//   npm run generate:images -- hero    # only outputs whose name contains "hero"
//
// Output lands in src/assets/images (statically imported by src/data/images.ts, which
// gives Next/Image intrinsic sizes and blur placeholders for free) plus the Open Graph
// card at src/app/opengraph-image.jpg.
//
// These are original, illustrated stand-ins for photography. To go to production,
// overwrite the files with real photos of the same aspect ratio — nothing else changes.
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { renderWebp, svgDoc } from "./lib.mjs";
import { sneaker, groundShadow } from "./sneaker.mjs";
import { PRODUCTS } from "./palettes.mjs";
import { SCENES } from "./scenes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(root, "src/assets/images");
const filter = process.argv[2] ?? "";

function productSvg({ silhouette, palette, slug }) {
  const W = 1200;
  const H = 900;
  const id = `p-${slug}`;
  return svgDoc(
    W,
    H,
    `
    <defs>
      <linearGradient id="${id}-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#F7F5F1"/><stop offset="1" stop-color="#E9E4DB"/>
      </linearGradient>
      <radialGradient id="${id}-spot" cx=".5" cy=".52" r=".55">
        <stop offset="0" stop-color="#FFFFFF" stop-opacity=".85"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#${id}-bg)"/>
    <rect width="${W}" height="${H}" fill="url(#${id}-spot)"/>
    <g transform="translate(600 652) translate(-510 -520)">
      ${groundShadow(`${id}-gs`, { opacity: 0.3 })}
      ${sneaker(silhouette, palette, id)}
    </g>`,
  );
}

const jobs = [];

for (const product of PRODUCTS) {
  jobs.push({
    name: `products/${product.slug}`,
    run: () =>
      renderWebp(productSvg(product), path.join(OUT, `products/${product.slug}.webp`), {
        width: 1200,
        height: 900,
        grain: 0.05,
        seed: product.slug.length * 97,
        quality: 84,
      }),
  });
}

let seed = 11;
for (const [name, scene] of Object.entries(SCENES)) {
  const s = (seed += 17);
  jobs.push({
    name,
    run: () =>
      renderWebp(scene.svg(), path.join(OUT, `${name}.webp`), {
        width: scene.width,
        height: scene.height,
        grain: scene.grain,
        seed: s,
        quality: 80,
      }),
  });
}

const selected = jobs.filter((j) => j.name.includes(filter));
if (selected.length === 0) {
  console.error(`No outputs match "${filter}".`);
  process.exit(1);
}

const started = Date.now();
for (const job of selected) {
  const t = Date.now();
  await job.run();
  console.log(`✓ ${job.name.padEnd(28)} ${((Date.now() - t) / 1000).toFixed(1)}s`);
}

// Open Graph card (1200x630) cropped from the first hero slide.
if (filter === "" || "opengraph".includes(filter) || "hero".includes(filter)) {
  await sharp(path.join(OUT, "hero/hero-1.webp"))
    .resize(1200, 630, { fit: "cover", position: "right" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(root, "src/app/opengraph-image.jpg"));
  console.log("✓ opengraph-image.jpg");
}

console.log(`Done in ${((Date.now() - started) / 1000).toFixed(1)}s`);
