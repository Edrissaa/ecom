// Editorial still-life scenes: warm rooms, hard window light, plinths, boxes and
// palm shadows, with the parametric sneakers staged inside them.
// Each scene returns { width, height, svg } — rasterised by index.mjs.
import { sneaker, groundShadow, GROUND_Y } from "./sneaker.mjs";
import { SCENE_SHOES as S } from "./palettes.mjs";
import { svgDoc } from "./lib.mjs";

let counter = 0;
const uid = (p) => `${p}${++counter}`;
const n1 = (n) => Math.round(n * 10) / 10;

const grad = (id, stops, { x1 = 0, y1 = 0, x2 = 0, y2 = 1 } = {}) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops
    .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
    .join("")}</linearGradient>`;

const blurFilter = (id, sd, pad = 20) =>
  `<filter id="${id}" x="-${pad}%" y="-${pad}%" width="${100 + pad * 2}%" height="${100 + pad * 2}%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;

/* ----------------------------- room ------------------------------ */
function room(W, H, { wall, floorY, floor, wallAngle = false }) {
  const w = uid("wall");
  const f = uid("floor");
  const j = uid("junction");
  return `
  <defs>
    ${grad(w, [[0, wall[0]], [1, wall[1]]], wallAngle ? { x1: 0, y1: 0, x2: 1, y2: 1 } : {})}
    ${grad(f, [[0, floor[0]], [1, floor[1]]])}
    ${grad(j, [[0, "#1b110a", 0], [1, "#1b110a", 0.28]])}
  </defs>
  <rect width="${W}" height="${floorY + 2}" fill="url(#${w})"/>
  <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="url(#${f})"/>
  <rect y="${floorY - 70}" width="${W}" height="72" fill="url(#${j})"/>`;
}

/* ------------------------- light & shadow ------------------------- */
/** Window light thrown on a wall: a skewed grid of lit panes. */
function sunWindow({ O, U, V, cols = 2, rows = 3, gap = 0.05, color = "#FFE6BC", opacity = 0.5, blur = 3 }) {
  const b = uid("sunblur");
  const g = uid("sungrad");
  let panes = "";
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const u0 = i / cols + gap / (2 * cols) * 2;
      const u1 = (i + 1) / cols - gap / (2 * cols) * 2;
      const v0 = j / rows + gap / (2 * rows) * 2;
      const v1 = (j + 1) / rows - gap / (2 * rows) * 2;
      const P = (u, v) => `${n1(O[0] + u * U[0] + v * V[0])},${n1(O[1] + u * U[1] + v * V[1])}`;
      panes += `<polygon points="${P(u0, v0)} ${P(u1, v0)} ${P(u1, v1)} ${P(u0, v1)}"/>`;
    }
  }
  const minX = Math.min(O[0], O[0] + V[0]);
  const maxX = Math.max(O[0] + U[0], O[0] + U[0] + V[0]);
  return `
  <defs>${blurFilter(b, blur)}${grad(g, [[0, color, opacity], [1, color, opacity * 0.45]], { x1: 0, y1: 0, x2: 0, y2: 1 })}</defs>
  <g filter="url(#${b})" fill="url(#${g})" data-x="${minX}-${maxX}">${panes}</g>`;
}

/** Venetian-blind light: parallel diagonal bands. */
function blindsLight({ O, U, V, bands = 6, duty = 0.55, color = "#F3C27A", opacity = 0.34, blur = 4 }) {
  const b = uid("blindblur");
  let polys = "";
  for (let i = 0; i < bands; i++) {
    const u0 = i / bands;
    const u1 = u0 + duty / bands;
    const P = (u, v) => `${n1(O[0] + u * U[0] + v * V[0])},${n1(O[1] + u * U[1] + v * V[1])}`;
    polys += `<polygon points="${P(u0, 0)} ${P(u1, 0)} ${P(u1, 1)} ${P(u0, 1)}"/>`;
  }
  return `<defs>${blurFilter(b, blur)}</defs><g filter="url(#${b})" fill="${color}" opacity="${opacity}">${polys}</g>`;
}

/** A single soft-edged ellipse of shadow (or light) on a surface. */
function softEllipse({ cx, cy, rx, ry, color = "#1b110a", opacity = 0.3, blur = 18, rotate = 0 }) {
  const b = uid("soft");
  return `<defs>${blurFilter(b, blur, 60)}</defs><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${color}" opacity="${opacity}" filter="url(#${b})" transform="rotate(${rotate} ${cx} ${cy})"/>`;
}

function vignette(W, H, { strength = 0.34, warm = "#1b110a" } = {}) {
  const v = uid("vig");
  return `<defs><radialGradient id="${v}" cx=".5" cy=".46" r=".78"><stop offset=".55" stop-color="${warm}" stop-opacity="0"/><stop offset="1" stop-color="${warm}" stop-opacity="${strength}"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#${v})"/>`;
}

/** Split a quadratic bezier between t0 and t1 (de Casteljau). */
function quadSub([p0, p1, p2], t0, t1) {
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const split = ([a, b, c], t) => {
    const ab = lerp(a, b, t);
    const bc = lerp(b, c, t);
    const m = lerp(ab, bc, t);
    return { left: [a, ab, m], right: [m, bc, c] };
  };
  let cur = [p0, p1, p2];
  if (t0 > 0) cur = split(cur, t0).right;
  if (t1 < 1) cur = split(cur, (t1 - t0) / (1 - t0)).left;
  return cur;
}

/** A palm-frond shadow: tapered, feathered comb of leaflets. */
function palmShadow({ x, y, scale = 1, rotate = 0, color = "#2C3820", opacity = 0.62, fronds = 9, spread = 150, length = 560, blur = 1.6, seed = 1 }) {
  const b = uid("palm");
  let out = "";
  for (let i = 0; i < fronds; i++) {
    const k = fronds === 1 ? 0.5 : i / (fronds - 1);
    const ang = ((-spread / 2 + k * spread - 90 + 0) * Math.PI) / 180 + Math.PI; // fan opening downward-right
    const L = length * (0.82 + 0.18 * Math.sin(i * 1.7 + seed));
    const end = [Math.cos(ang) * L, Math.sin(ang) * L + L * 0.38];
    const ctrl = [Math.cos(ang) * L * 0.55, Math.sin(ang) * L * 0.55 - L * 0.12];
    const q = [[0, 0], ctrl, end];
    const rnd = (k) => { const v = Math.sin((i + 1) * 12.9898 + (seed + k) * 78.233) * 43758.5453; return v - Math.floor(v); };
    const dash = `${n1(2 + rnd(1) * 1.4)} ${n1(5 + rnd(2) * 2.6)}`;
    const seg = (t0, t1, w) => {
      const [a, c, d] = quadSub(q, t0, t1);
      return `<path d="M${n1(a[0])} ${n1(a[1])} Q${n1(c[0])} ${n1(c[1])} ${n1(d[0])} ${n1(d[1])}" fill="none" stroke="${color}" stroke-width="${w}" stroke-dasharray="${dash}"/>`;
    };
    const [, c0, d0] = q;
    out += `<path d="M0 0 Q${n1(c0[0])} ${n1(c0[1])} ${n1(d0[0])} ${n1(d0[1])}" fill="none" stroke="${color}" stroke-width="4"/>`;
    out += seg(0.1, 0.5, 52) + seg(0.5, 0.8, 38) + seg(0.8, 1, 18);
  }
  return `<defs>${blurFilter(b, blur)}</defs><g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})" opacity="${opacity}" filter="url(#${b})">${out}</g>`;
}

/* ------------------------------ props ------------------------------ */
function cylinder({ x, topY, w, h, top = "#EADFCB", sideA = "#D5C6AC", sideB = "#B7A688", shade = 0.25 }) {
  const g = uid("cyl");
  const ry = w * 0.1;
  return `
  <defs>${grad(g, [[0, sideA], [0.55, sideA], [1, sideB]], { x1: 0, y1: 0, x2: 1, y2: 0 })}</defs>
  <path d="M${x - w / 2} ${topY} L${x - w / 2} ${topY + h} A${w / 2} ${ry} 0 0 0 ${x + w / 2} ${topY + h} L${x + w / 2} ${topY} Z" fill="url(#${g})"/>
  <path d="M${x - w / 2} ${topY + h * 0.7} L${x - w / 2} ${topY + h} A${w / 2} ${ry} 0 0 0 ${x + w / 2} ${topY + h} L${x + w / 2} ${topY + h * 0.7} Z" fill="#1b110a" opacity="${shade * 0.4}"/>
  <ellipse cx="${x}" cy="${topY}" rx="${w / 2}" ry="${ry}" fill="${top}"/>
  <ellipse cx="${x}" cy="${topY}" rx="${w / 2}" ry="${ry}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`;
}

function box({ x, y, w, h, dx = 56, dy = -44, front = "#C79B6B", top = "#DDBB91", side = "#A67B50", band = "#EBD8B8" }) {
  return `
  <polygon points="${x + w},${y} ${x + w + dx},${y + dy} ${x + w + dx},${y + h + dy} ${x + w},${y + h}" fill="${side}"/>
  <polygon points="${x},${y} ${x + dx},${y + dy} ${x + w + dx},${y + dy} ${x + w},${y}" fill="${top}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${front}"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h * 0.2}" fill="#fff" opacity=".1"/>
  <rect x="${x}" y="${y + h * 0.2}" width="${w}" height="5" fill="#1b110a" opacity=".2"/>
  <rect x="${x + w * 0.1}" y="${y + h * 0.42}" width="${w * 0.3}" height="${h * 0.34}" rx="4" fill="${band}"/>
  <rect x="${x + w * 0.14}" y="${y + h * 0.5}" width="${w * 0.2}" height="5" fill="#1b110a" opacity=".5"/>
  <rect x="${x + w * 0.14}" y="${y + h * 0.6}" width="${w * 0.14}" height="4" fill="#1b110a" opacity=".3"/>`;
}

function archShape({ x, baseY, w, h, color, opacity = 1 }) {
  const r = w / 2;
  return `<path d="M${x} ${baseY} V${baseY - h + r} A${r} ${r} 0 0 1 ${x + w} ${baseY - h + r} V${baseY} Z" fill="${color}" opacity="${opacity}"/>`;
}

function stool({ x, seatY, rx = 190, legH = 240, wood = "#B3814F", woodDark = "#8A5F36" }) {
  const g = uid("wood");
  return `
  <defs>${grad(g, [[0, wood], [1, woodDark]], { x1: 0, y1: 0, x2: 1, y2: 0 })}</defs>
  <path d="M${x - rx * 0.78} ${seatY + 20} L${x - rx * 0.92} ${seatY + legH} L${x - rx * 0.8} ${seatY + legH} L${x - rx * 0.55} ${seatY + 20} Z" fill="url(#${g})"/>
  <path d="M${x + rx * 0.78} ${seatY + 20} L${x + rx * 0.9} ${seatY + legH} L${x + rx * 0.78} ${seatY + legH} L${x + rx * 0.5} ${seatY + 20} Z" fill="url(#${g})"/>
  <path d="M${x - rx * 0.2} ${seatY + 24} L${x - rx * 0.28} ${seatY + legH - 14} L${x - rx * 0.16} ${seatY + legH - 14} L${x - rx * 0.04} ${seatY + 24} Z" fill="${woodDark}"/>
  <path d="M${x - rx} ${seatY} L${x - rx} ${seatY + 26} A${rx} ${rx * 0.19} 0 0 0 ${x + rx} ${seatY + 26} L${x + rx} ${seatY} Z" fill="${woodDark}"/>
  <ellipse cx="${x}" cy="${seatY}" rx="${rx}" ry="${rx * 0.19}" fill="${wood}"/>
  <ellipse cx="${x}" cy="${seatY}" rx="${rx * 0.86}" ry="${rx * 0.15}" fill="#fff" opacity=".1"/>`;
}

/* ------------------------------ shoes ------------------------------ */
/**
 * Stage a sneaker. (cx, ground) is where the centre of the sole touches the
 * surface. `cast` adds a projected hard-light shadow on the floor.
 */
function shoe(sil, pal, { cx, ground, scale = 1, rotate = 0, flip = false, shadow = 1, cast = null }) {
  const id = uid("shoe");
  const sx = flip ? -scale : scale;
  const tf = `translate(${cx} ${ground}) rotate(${rotate}) scale(${sx} ${scale}) translate(-510 -${GROUND_Y})`;
  let out = "";
  if (shadow) {
    out += `<g transform="translate(${cx} ${ground}) scale(${scale}) translate(-510 -${GROUND_Y})">${groundShadow(id, { opacity: 0.34 * shadow })}</g>`;
  }
  const body = `<g transform="${tf}">${sneaker(sil, pal, id)}</g>`;
  if (cast) {
    const f = uid("cast");
    const skew = cast.skew ?? -42;
    const squash = cast.squash ?? 0.3;
    out += `
    <defs>
      <filter id="${f}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .1  0 0 0 0 .06  0 0 0 0 .03  0 0 0 1 0"/>
        <feGaussianBlur stdDeviation="${cast.blur ?? 5}"/>
      </filter>
    </defs>`;
    // The cast is built from a second drawing of the shoe, mirrored below the ground line.
    out += `<g opacity="${cast.opacity ?? 0.32}" filter="url(#${f})" transform="translate(${cx} ${ground}) skewX(${skew}) scale(${sx} ${-scale * squash}) translate(-510 -${GROUND_Y})">${sneaker(sil, pal, id + "c")}</g>`;
  }
  return out + body;
}

/* ============================== scenes ============================= */
const SCENES = {};

/* ----------------------------- HERO 1 ------------------------------ */
SCENES["hero/hero-1"] = {
  width: 2000, height: 1000, grain: 0.17,
  svg() {
    const W = 2000, H = 1000;
    return svgDoc(W, H, [
      room(W, H, { wall: ["#BE8B63", "#9A6A47"], floorY: 790, floor: ["#CDA479", "#A97B52"] }),
      archShape({ x: 1620, baseY: 790, w: 330, h: 660, color: "#A87449", opacity: 0.55 }),
      sunWindow({ O: [1000, 20], U: [580, 50], V: [-160, 660], cols: 2, rows: 3, gap: 0.045, opacity: 0.5 }),
      softEllipse({ cx: 1490, cy: 906, rx: 470, ry: 32, opacity: 0.4, blur: 22 }),
      cylinder({ x: 1490, topY: 690, w: 720, h: 226, top: "#EFE3CD", sideA: "#E1D2B8", sideB: "#BBA887" }),
      shoe("runner", S.cloud, { cx: 1490, ground: 700, scale: 1.0, rotate: -2, shadow: 0.5 }),
      softEllipse({ cx: 1080, cy: 946, rx: 300, ry: 22, opacity: 0.42, blur: 14 }),
      shoe("court", S.brick, { cx: 1070, ground: 940, scale: 0.46, flip: true, shadow: 0.6 }),
      vignette(W, H, { strength: 0.32 }),
    ].join(""));
  },
};

/* ----------------------------- HERO 2 ------------------------------ */
SCENES["hero/hero-2"] = {
  width: 2000, height: 1000, grain: 0.17,
  svg() {
    const W = 2000, H = 1000;
    const d = uid("disc");
    return svgDoc(W, H, [
      room(W, H, { wall: ["#9AA987", "#7C8C6E"], floorY: 800, floor: ["#CFC9A8", "#ABA684"] }),
      `<defs><radialGradient id="${d}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#FBEFD0"/><stop offset="1" stop-color="#EBD9AE"/></radialGradient></defs>
       <circle cx="1450" cy="440" r="385" fill="url(#${d})"/>
       <circle cx="1450" cy="440" r="465" fill="none" stroke="#F6E9C8" stroke-opacity=".32" stroke-width="3"/>
       <circle cx="1450" cy="440" r="545" fill="none" stroke="#F6E9C8" stroke-opacity=".16" stroke-width="3"/>`,
      cylinder({ x: 1860, topY: 700, w: 240, h: 150, top: "#EFE6CF", sideA: "#DCD2B6", sideB: "#B7AE8E" }),
      cylinder({ x: 1090, topY: 740, w: 200, h: 100, top: "#EFE6CF", sideA: "#DCD2B6", sideB: "#B7AE8E" }),
      softEllipse({ cx: 1450, cy: 892, rx: 470, ry: 32, opacity: 0.4, blur: 22 }),
      shoe("runner", S.coral, { cx: 1450, ground: 700, scale: 1.08, rotate: -11, shadow: 0 }),
      vignette(W, H, { strength: 0.3 }),
    ].join(""));
  },
};

/* ----------------------------- HERO 3 ------------------------------ */
SCENES["hero/hero-3"] = {
  width: 2000, height: 1000, grain: 0.19,
  svg() {
    const W = 2000, H = 1000;
    return svgDoc(W, H, [
      room(W, H, { wall: ["#53402F", "#33261C"], floorY: 800, floor: ["#68503A", "#3D2D20"] }),
      blindsLight({ O: [940, -60], U: [1200, 40], V: [-260, 980], bands: 7, duty: 0.5, opacity: 0.3 }),
      softEllipse({ cx: 1500, cy: 874, rx: 540, ry: 36, opacity: 0.5, blur: 24 }),
      box({ x: 1150, y: 646, w: 700, h: 220, front: "#C79B6B", top: "#DDBB91", side: "#A67B50", dx: 64, dy: -50 }),
      box({ x: 1192, y: 476, w: 620, h: 170, front: "#D5AB78", top: "#E6C79E", side: "#B38859", dx: 56, dy: -44 }),
      shoe("court", S.sage, { cx: 1520, ground: 460, scale: 0.8, rotate: -3, shadow: 0.35 }),
      vignette(W, H, { strength: 0.4 }),
    ].join(""));
  },
};

/* ---------------------------- PROMO CARDS -------------------------- */
SCENES["promo/promo-1"] = {
  width: 840, height: 1050, grain: 0.17,
  svg() {
    const W = 840, H = 1050;
    return svgDoc(W, H, [
      room(W, H, { wall: ["#86A3A1", "#5F7F7E"], floorY: 780, floor: ["#CBBBA0", "#A99880"] }),
      sunWindow({ O: [40, 40], U: [380, 40], V: [-30, 520], cols: 2, rows: 3, opacity: 0.38, color: "#FFEFD0" }),
      softEllipse({ cx: 420, cy: 700, rx: 360, ry: 28, opacity: 0.4, blur: 20 }),
      shoe("runner", S.cloud, { cx: 440, ground: 540, scale: 0.84, rotate: -12, shadow: 0 }),
      vignette(W, H, { strength: 0.3 }),
    ].join(""));
  },
};

SCENES["promo/promo-2"] = {
  width: 840, height: 1050, grain: 0.17,
  svg() {
    const W = 840, H = 1050;
    return svgDoc(W, H, [
      room(W, H, { wall: ["#EBDCC2", "#D7C3A0"], floorY: 820, floor: ["#BDAD92", "#9C8C72"] }),
      archShape({ x: 130, baseY: 820, w: 580, h: 700, color: "#B8A57C", opacity: 0.6 }),
      archShape({ x: 200, baseY: 820, w: 440, h: 600, color: "#8E9A6A", opacity: 0.75 }),
      softEllipse({ cx: 420, cy: 880, rx: 300, ry: 30, opacity: 0.45, blur: 20 }),
      cylinder({ x: 420, topY: 560, w: 470, h: 300, top: "#F2E8D2", sideA: "#E4D6BC", sideB: "#BDAA88" }),
      shoe("court", S.sage, { cx: 430, ground: 574, scale: 0.55, rotate: 4, shadow: 0.4 }),
      vignette(W, H, { strength: 0.28 }),
    ].join(""));
  },
};

SCENES["promo/promo-3"] = {
  width: 840, height: 1050, grain: 0.18,
  svg() {
    const W = 840, H = 1050;
    const sky = uid("sky");
    const sun = uid("sun");
    return svgDoc(W, H, [
      `<defs>${grad(sky, [[0, "#F6D9B2"], [0.6, "#EDB48A"], [1, "#DE8E68"]])}<radialGradient id="${sun}"><stop offset="0" stop-color="#FFF1D6"/><stop offset="1" stop-color="#FFE0B0" stop-opacity="0"/></radialGradient></defs>
       <rect width="${W}" height="${H}" fill="url(#${sky})"/>
       <circle cx="560" cy="330" r="300" fill="url(#${sun})"/>
       <circle cx="560" cy="330" r="130" fill="#FFF0D4"/>`,
      `<rect y="800" width="${W}" height="${H - 800}" fill="#D9B48A"/>
       <rect y="800" width="${W}" height="${H - 800}" fill="#2A1A0E" opacity=".08"/>`,
      palmShadow({ x: -30, y: -30, scale: 1.05, rotate: 24, fronds: 9, spread: 130, length: 560, opacity: 0.7, seed: 2 }),
      palmShadow({ x: 880, y: 60, scale: 0.8, rotate: -20, fronds: 7, spread: 120, length: 480, opacity: 0.5, seed: 5 }),
      softEllipse({ cx: 400, cy: 930, rx: 320, ry: 28, opacity: 0.4, blur: 18 }),
      shoe("canvas", S.navy, { cx: 410, ground: 925, scale: 0.7, rotate: 0, shadow: 0.55 }),
      vignette(W, H, { strength: 0.26 }),
    ].join(""));
  },
};

/* ------------------------------ MOSAIC ----------------------------- */
SCENES["mosaic/mosaic-tall"] = {
  width: 960, height: 1240, grain: 0.17,
  svg() {
    const W = 960, H = 1240;
    return svgDoc(W, H, [
      room(W, H, { wall: ["#E2CFAF", "#CDB590"], floorY: 880, floor: ["#BE9F77", "#9C805C"] }),
      sunWindow({ O: [500, 40], U: [400, 30], V: [-110, 640], cols: 2, rows: 3, opacity: 0.5 }),
      softEllipse({ cx: 560, cy: 1128, rx: 250, ry: 22, opacity: 0.4, blur: 16 }),
      stool({ x: 560, seatY: 700, rx: 190, legH: 420 }),
      shoe("court", S.oat, { cx: 560, ground: 710, scale: 0.6, shadow: 0.2, rotate: -2 }),
      softEllipse({ cx: 730, cy: 1094, rx: 330, ry: 26, opacity: 0.42, blur: 16 }),
      shoe("runner", S.cloud, { cx: 740, ground: 1100, scale: 0.6, flip: true, shadow: 0.5 }),
      vignette(W, H, { strength: 0.3 }),
    ].join(""));
  },
};

SCENES["mosaic/mosaic-top"] = {
  width: 1200, height: 800, grain: 0.17,
  svg() {
    const W = 1200, H = 800;
    return svgDoc(W, H, [
      room(W, H, { wall: ["#E4C48C", "#D2AA68"], floorY: 610, floor: ["#B68B55", "#98703F"] }),
      archShape({ x: 760, baseY: 610, w: 360, h: 520, color: "#C9954F", opacity: 0.5 }),
      softEllipse({ cx: 720, cy: 730, rx: 480, ry: 30, opacity: 0.42, blur: 18 }),
      shoe("canvas", S.navy, { cx: 780, ground: 730, scale: 1.2, rotate: -6, shadow: 0.2 }),
      vignette(W, H, { strength: 0.28 }),
    ].join(""));
  },
};

SCENES["mosaic/mosaic-bottom"] = {
  width: 1200, height: 800, grain: 0.17,
  svg() {
    const W = 1200, H = 800;
    return svgDoc(W, H, [
      room(W, H, { wall: ["#BCCBD1", "#9DB0BA"], floorY: 600, floor: ["#DAD4C7", "#BEB7A7"] }),
      sunWindow({ O: [760, 30], U: [380, 20], V: [70, 520], cols: 2, rows: 3, opacity: 0.55, color: "#FFF3DA" }),
      softEllipse({ cx: 700, cy: 722, rx: 470, ry: 30, opacity: 0.4, blur: 18 }),
      shoe("court", S.brick, { cx: 700, ground: 724, scale: 1.04, rotate: 3, shadow: 0.25 }),
      vignette(W, H, { strength: 0.28 }),
    ].join(""));
  },
};

SCENES["mosaic/mosaic-wide"] = {
  width: 2400, height: 900, grain: 0.18,
  svg() {
    const W = 2400, H = 900;
    return svgDoc(W, H, [
      room(W, H, { wall: ["#F0E7D6", "#E0D1B7"], floorY: 740, floor: ["#C8AB84", "#A88C66"] }),
      archShape({ x: 120, baseY: 740, w: 520, h: 640, color: "#CDAA80", opacity: 0.55 }),
      sunWindow({ O: [820, 20], U: [640, 30], V: [-160, 700], cols: 3, rows: 2, opacity: 0.5 }),
      softEllipse({ cx: 1720, cy: 1000, rx: 900, ry: 40, opacity: 0.35, blur: 24 }),
      shoe("court", S.sage, { cx: 1740, ground: 990, scale: 2.1, rotate: -3, shadow: 0 }),
      vignette(W, H, { strength: 0.26 }),
    ].join(""));
  },
};

/* --------------------------- CTA BANNER ---------------------------- */
SCENES["banner/banner-cta"] = {
  width: 2400, height: 800, grain: 0.19,
  svg() {
    const W = 2400, H = 800;
    const glow = uid("glow");
    return svgDoc(W, H, [
      room(W, H, { wall: ["#946445", "#6F4A30"], floorY: 600, floor: ["#A87C54", "#7B573A"] }),
      `<defs><radialGradient id="${glow}" cx=".5" cy=".4" r=".5"><stop offset="0" stop-color="#F4C78A" stop-opacity=".5"/><stop offset="1" stop-color="#F4C78A" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#${glow})"/>`,
      archShape({ x: 960, baseY: 600, w: 480, h: 560, color: "#80563A", opacity: 0.6 }),
      blindsLight({ O: [700, -40], U: [1000, 30], V: [-220, 860], bands: 7, duty: 0.45, opacity: 0.22 }),
      softEllipse({ cx: 330, cy: 740, rx: 420, ry: 28, opacity: 0.45, blur: 18 }),
      shoe("court", S.brick, { cx: 300, ground: 740, scale: 1.0, rotate: -2, shadow: 0.3 }),
      softEllipse({ cx: 2080, cy: 740, rx: 420, ry: 28, opacity: 0.45, blur: 18 }),
      shoe("runner", S.cloud, { cx: 2110, ground: 740, scale: 1.0, flip: true, rotate: 2, shadow: 0.3 }),
      vignette(W, H, { strength: 0.4 }),
    ].join(""));
  },
};

export { SCENES };
