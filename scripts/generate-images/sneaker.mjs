// Original, parametric sneaker illustrations (side profile, toe pointing right).
// Local coordinate space: 1000 x 600, ground line at y = 520.
//
// Three silhouettes are available — "runner" (chunky foam sole, mesh vamp),
// "court" (low retro cupsole with perforated toe and wing panel) and
// "canvas" (vulcanised low-top). Every colour is driven by a palette, so a
// handful of drawings yields a full range of colourways.

export const GROUND_Y = 520;
export const SNEAKER_BOUNDS = { x: 55, y: 110, width: 915, height: 420 };

const cubic = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
};

const cubicTangent = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
};

const r1 = (n) => Math.round(n * 10) / 10;
const pt = (p) => `${r1(p[0])} ${r1(p[1])}`;

/**
 * Lace system laid out along a cubic "throat" curve:
 * returns the eyestay band, lace bars and eyelets.
 */
function laceSystem({ line, count, band, p, eyelet = "round", lacePitch = [0.08, 0.93], laceWidth = 10 }) {
  const [p0, p1, p2, p3] = line;
  const samples = 28;
  const top = [];
  const bottom = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const c = cubic(p0, p1, p2, p3, t);
    const [tx, ty] = cubicTangent(p0, p1, p2, p3, t);
    const n = [-ty, tx]; // points down-left, toward the foot side
    top.push(c);
    bottom.push([c[0] + n[0] * band, c[1] + n[1] * band]);
  }
  const bandPath = `M${top.map(pt).join(" L")} L${bottom.reverse().map(pt).join(" L")} Z`;

  let bars = "";
  let shadows = "";
  let eyelets = "";
  for (let i = 0; i < count; i++) {
    const t = lacePitch[0] + ((lacePitch[1] - lacePitch[0]) * i) / (count - 1);
    const c = cubic(p0, p1, p2, p3, t);
    const [tx, ty] = cubicTangent(p0, p1, p2, p3, t);
    const n = [-ty, tx];
    const a = [c[0] + n[0] * band * 0.82 - tx * 3, c[1] + n[1] * band * 0.82 - ty * 3];
    const b = [c[0] - n[0] * 7 + tx * 9, c[1] - n[1] * 7 + ty * 9];
    shadows += `<line x1="${r1(a[0] + 1.5)}" y1="${r1(a[1] + 3.5)}" x2="${r1(b[0] + 1.5)}" y2="${r1(b[1] + 3.5)}" stroke="#000" stroke-opacity=".28" stroke-width="${laceWidth + 2}" stroke-linecap="round"/>`;
    bars += `<line x1="${r1(a[0])}" y1="${r1(a[1])}" x2="${r1(b[0])}" y2="${r1(b[1])}" stroke="${p.lace}" stroke-width="${laceWidth}" stroke-linecap="round"/>`;
    bars += `<line x1="${r1(a[0] + n[0] * 0)}" y1="${r1(a[1] - 2)}" x2="${r1(b[0])}" y2="${r1(b[1] - 2)}" stroke="#fff" stroke-opacity=".35" stroke-width="2.4" stroke-linecap="round"/>`;
    const e = [c[0] + n[0] * band * 0.78, c[1] + n[1] * band * 0.78];
    eyelets +=
      eyelet === "metal"
        ? `<circle cx="${r1(e[0])}" cy="${r1(e[1])}" r="6.5" fill="#B9B3A8" stroke="#6F6A62" stroke-width="1.4"/><circle cx="${r1(e[0])}" cy="${r1(e[1])}" r="2.6" fill="#2A211A"/>`
        : `<circle cx="${r1(e[0])}" cy="${r1(e[1])}" r="4.2" fill="${p.eyelet}"/>`;
  }
  return { bandPath, shadows, bars, eyelets };
}

/** Shared volume lighting, clipped to the upper's silhouette. */
function volume(id, d, { hx, hy, hr, top = 0.24, bottom = 0.3 }) {
  return `
  <defs>
    <clipPath id="${id}-clip"><path d="${d}"/></clipPath>
    <linearGradient id="${id}-vol" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="${top}"/>
      <stop offset=".5" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#1b110a" stop-opacity="${bottom}"/>
    </linearGradient>
    <filter id="${id}-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="${hr * 0.45}"/></filter>
  </defs>
  <g clip-path="url(#${id}-clip)">
    <rect x="0" y="100" width="1000" height="430" fill="url(#${id}-vol)"/>
    <ellipse cx="${hx}" cy="${hy}" rx="${hr * 1.7}" ry="${hr * 0.7}" fill="#fff" opacity=".2" filter="url(#${id}-soft)" transform="rotate(14 ${hx} ${hy})"/>
  </g>`;
}

const edge = (opacity = 0.34) => `fill="none" stroke="#21170F" stroke-opacity="${opacity}" stroke-width="1.6" stroke-linejoin="round"`;

/** Contact + ambient shadow that sits under any sneaker. */
export function groundShadow(id, { opacity = 0.34, spread = 1 } = {}) {
  return `
  <defs>
    <filter id="${id}-gs1" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="${16 * spread}"/></filter>
    <filter id="${id}-gs2" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="${4 * spread}"/></filter>
  </defs>
  <ellipse cx="520" cy="${GROUND_Y + 8}" rx="${450 * spread}" ry="${24 * spread}" fill="#21170F" opacity="${opacity}" filter="url(#${id}-gs1)"/>
  <ellipse cx="515" cy="${GROUND_Y + 2}" rx="${380 * spread}" ry="${7 * spread}" fill="#120B06" opacity="${Math.min(0.7, opacity * 1.5)}" filter="url(#${id}-gs2)"/>`;
}

/* ------------------------------------------------------------------ */
/* RUNNER                                                              */
/* ------------------------------------------------------------------ */
function runner(p, id) {
  const UPPER =
    "M70 400 C55 350 58 282 94 226 C112 200 140 192 172 197 C205 203 236 228 268 240 C286 246 300 238 308 214 L330 148 C341 120 381 118 392 145 L408 190 C470 222 530 262 590 298 C676 330 788 330 866 362 C924 386 958 412 952 446 L926 472 L72 470 Z";
  const MID =
    "M68 396 C56 440 66 490 100 510 C140 522 220 526 320 527 C470 528 620 526 720 519 C820 511 890 501 930 484 C956 470 966 450 956 430 C900 442 830 442 740 438 C610 432 480 436 340 426 C220 418 130 404 68 396 Z";
  const line = [
    [408, 190],
    [470, 222],
    [530, 262],
    [590, 298],
  ];
  const lc = laceSystem({ line, count: 6, band: 36, p, lacePitch: [0.1, 0.94] });

  return `
  <g id="${id}">
    <defs>
      <pattern id="${id}-mesh" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
        <circle cx="2.4" cy="2.4" r="1.25" fill="#0f0905" opacity=".2"/>
        <circle cx="6.9" cy="6.9" r="1.25" fill="#0f0905" opacity=".2"/>
      </pattern>
      <clipPath id="${id}-mid"><path d="${MID}"/></clipPath>
      <linearGradient id="${id}-midg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#2a1a0e" stop-opacity=".22"/>
      </linearGradient>
    </defs>
    <!-- upper base -->
    <path d="${UPPER}" fill="${p.upper}"/>
    <path d="${UPPER}" fill="url(#${id}-mesh)"/>
    <!-- collar lining visible through the opening -->
    <path d="M128 203 C172 182 252 192 304 228 C284 236 252 230 214 212 C184 198 152 198 128 203 Z" fill="${p.lining}"/>
    <!-- tongue -->
    <path d="M308 216 L330 148 C341 120 381 118 392 145 L408 190 C388 214 340 244 306 246 Z" fill="${p.tongue}"/>
    <path d="M330 148 C341 120 381 118 392 145" ${edge(0.3)}/>
    <!-- heel counter -->
    <path d="M70 400 C55 350 58 284 94 228 C120 222 150 240 160 286 C168 330 172 378 178 410 Z" fill="${p.heel}"/>
    <path d="M94 228 C120 222 150 240 160 286 C168 330 172 378 178 410" ${edge()}/>
    <!-- saddle overlay -->
    <path d="M452 252 C506 288 566 322 648 348 L606 436 C560 438 480 432 402 426 C372 384 396 308 452 252 Z" fill="${p.panel}"/>
    <path d="M452 252 C506 288 566 322 648 348 L606 436 C560 438 480 432 402 426 C372 384 396 308 452 252 Z" ${edge()}/>
    <path d="M437 276 C390 326 378 378 408 420" fill="none" stroke="${p.accent}" stroke-width="7" stroke-linecap="round"/>
    <path d="M419 262 C366 318 354 386 390 424" fill="none" stroke="${p.accent}" stroke-width="3.5" stroke-linecap="round" opacity=".75"/>
    <!-- toe box -->
    <path d="M804 440 C802 372 842 350 884 372 C930 394 958 416 952 446 Z" fill="${p.toe}"/>
    <path d="M804 440 C802 372 842 350 884 372 C930 394 958 416 952 446" ${edge()}/>
    <!-- eyestay + laces -->
    <path d="${lc.bandPath}" fill="${p.panel}"/>
    <path d="${lc.bandPath}" ${edge(0.28)}/>
    ${lc.shadows}${lc.bars}${lc.eyelets}
    <!-- heel tab -->
    <path d="M94 228 C84 206 92 188 112 190 L124 204 C110 209 106 220 108 234 Z" fill="${p.accent}"/>
    ${volume(id, UPPER, { hx: 700, hy: 318, hr: 70 })}
    <path d="${UPPER}" ${edge(0.4)}/>
    <!-- foam midsole -->
    <path d="${MID}" fill="${p.midsole}"/>
    <g clip-path="url(#${id}-mid)">
      <path d="M40 496 C300 504 620 504 980 474 L980 560 L40 560 Z" fill="${p.outsole}"/>
      <rect x="40" y="380" width="940" height="170" fill="url(#${id}-midg)"/>
      <path d="M96 452 C200 470 330 462 450 470 C560 477 640 474 748 468" fill="none" stroke="#2a1a0e" stroke-opacity=".22" stroke-width="6"/>
      <path d="M96 447 C200 465 330 457 450 465 C560 472 640 469 748 463" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.5"/>
      <ellipse cx="148" cy="466" rx="24" ry="13" fill="#2a1a0e" opacity=".2"/>
      <ellipse cx="214" cy="472" rx="24" ry="13" fill="#2a1a0e" opacity=".2"/>
      <ellipse cx="280" cy="474" rx="24" ry="13" fill="#2a1a0e" opacity=".2"/>
    </g>
    <path d="${MID}" ${edge(0.42)}/>
  </g>`;
}

/* ------------------------------------------------------------------ */
/* COURT                                                               */
/* ------------------------------------------------------------------ */
function court(p, id) {
  const UPPER =
    "M75 458 C62 400 66 340 92 292 C105 272 130 266 155 272 C190 282 225 306 262 312 C285 312 298 300 304 280 L322 218 C330 196 362 192 372 212 L388 246 C450 268 520 298 585 330 C690 372 820 385 890 420 C930 438 960 450 958 468 L938 492 L75 492 Z";
  const SOLE =
    "M72 452 C64 484 78 512 112 520 L884 520 C938 520 964 496 960 462 C930 470 880 466 820 464 C600 456 300 454 72 452 Z";
  const line = [
    [388, 246],
    [450, 268],
    [520, 298],
    [585, 330],
  ];
  const lc = laceSystem({ line, count: 5, band: 32, p, lacePitch: [0.1, 0.92], laceWidth: 9 });

  // Perforation grid on the toe cap.
  let perfs = "";
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 7; col++) {
      const x = 800 + col * 19 + (row % 2) * 9.5;
      const y = 410 + row * 14 + col * 3.2;
      if (x < 940) perfs += `<circle cx="${x}" cy="${y}" r="2.8" fill="#1b110a" opacity=".42"/>`;
    }
  }

  return `
  <g id="${id}">
    <defs>
      <clipPath id="${id}-sole"><path d="${SOLE}"/></clipPath>
      <linearGradient id="${id}-soleg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#2a1a0e" stop-opacity=".2"/>
      </linearGradient>
    </defs>
    <path d="${UPPER}" fill="${p.upper}"/>
    <path d="M128 272 C172 262 232 286 300 300 C284 312 252 314 214 304 C184 292 152 276 128 272 Z" fill="${p.lining}"/>
    <path d="M304 282 L322 218 C330 196 362 192 372 212 L388 246 C368 266 330 290 304 300 Z" fill="${p.tongue}"/>
    <path d="M322 218 C330 196 362 192 372 212" ${edge(0.3)}/>
    <!-- heel counter -->
    <path d="M75 458 C62 400 66 340 92 292 C118 288 146 312 154 352 C160 392 164 430 170 462 Z" fill="${p.heel}"/>
    <path d="M92 292 C118 288 146 312 154 352 C160 392 164 430 170 462" ${edge()}/>
    <!-- wing panel -->
    <path d="M480 322 C396 330 306 380 236 462 L318 462 C358 414 420 376 534 350 Z" fill="${p.panel}"/>
    <path d="M480 322 C396 330 306 380 236 462 L318 462 C358 414 420 376 534 350 Z" ${edge()}/>
    <path d="M462 338 C390 350 322 392 270 452" fill="none" stroke="${p.accent}" stroke-width="5" stroke-linecap="round"/>
    <!-- toe cap -->
    <clipPath id="${id}-toe"><path d="M790 462 C792 404 836 388 880 414 C924 432 956 448 958 466 Z"/></clipPath>
    <path d="M790 462 C792 404 836 388 880 414 C924 432 956 448 958 466 Z" fill="${p.toe}"/>
    <path d="M790 462 C792 404 836 388 880 414 C924 432 956 448 958 466" ${edge()}/>
    <g clip-path="url(#${id}-toe)">${perfs}</g>
    <!-- eyestay + laces -->
    <path d="${lc.bandPath}" fill="${p.panel}"/>
    <path d="${lc.bandPath}" ${edge(0.28)}/>
    ${lc.shadows}${lc.bars}${lc.eyelets}
    <!-- heel tab -->
    <path d="M92 292 C82 270 90 252 110 254 L124 268 C110 274 106 286 108 300 Z" fill="${p.accent}"/>
    ${volume(id, UPPER, { hx: 660, hy: 350, hr: 62, top: 0.2, bottom: 0.28 })}
    <path d="${UPPER}" ${edge(0.4)}/>
    <!-- cupsole -->
    <path d="${SOLE}" fill="${p.midsole}"/>
    <g clip-path="url(#${id}-sole)">
      <rect x="40" y="440" width="940" height="100" fill="url(#${id}-soleg)"/>
      <path d="M40 500 C300 506 640 506 980 484 L980 560 L40 560 Z" fill="${p.outsole}"/>
      <path d="M72 470 C300 474 640 476 962 474" fill="none" stroke="#2a1a0e" stroke-opacity=".16" stroke-width="3"/>
    </g>
    <path d="${SOLE}" ${edge(0.42)}/>
  </g>`;
}

/* ------------------------------------------------------------------ */
/* CANVAS                                                              */
/* ------------------------------------------------------------------ */
function canvas(pal, id) {
  const p = { ...pal, sole: pal.sole ?? pal.midsole };
  const UPPER =
    "M80 470 C62 410 64 330 92 270 C106 246 134 240 160 246 C196 256 228 282 262 290 C284 292 298 280 304 258 L318 196 C326 174 360 172 372 192 L388 228 C450 252 520 286 590 320 C690 366 820 380 890 414 C932 434 962 450 960 478 L942 496 L80 496 Z";
  const SOLE =
    "M70 462 C62 490 72 512 104 522 L890 522 C942 522 968 500 962 468 C940 478 880 470 820 466 C600 458 300 462 70 462 Z";
  const line = [
    [388, 228],
    [450, 252],
    [520, 286],
    [590, 320],
  ];
  const lc = laceSystem({ line, count: 6, band: 30, p, eyelet: "metal", lacePitch: [0.1, 0.93], laceWidth: 9 });

  return `
  <g id="${id}">
    <defs>
      <pattern id="${id}-weave" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="7" height="1.4" fill="#000" opacity=".055"/>
        <rect y="3.5" width="7" height="1" fill="#fff" opacity=".07"/>
      </pattern>
      <clipPath id="${id}-sole"><path d="${SOLE}"/></clipPath>
      <linearGradient id="${id}-soleg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#2a1a0e" stop-opacity=".16"/>
      </linearGradient>
    </defs>
    <path d="${UPPER}" fill="${p.upper}"/>
    <path d="${UPPER}" fill="url(#${id}-weave)"/>
    <path d="M128 246 C172 238 232 266 304 280 C286 294 252 292 214 282 C184 268 152 250 128 246 Z" fill="${p.lining}"/>
    <path d="M304 262 L318 196 C326 174 360 172 372 192 L388 228 C368 250 330 272 304 282 Z" fill="${p.tongue}"/>
    <path d="M318 196 C326 174 360 172 372 192" ${edge(0.3)}/>
    <!-- heel stay -->
    <path d="M80 470 C62 410 64 330 92 270 C116 268 142 296 150 338 C156 380 160 430 168 470 Z" fill="${p.heel}"/>
    <path d="M92 270 C116 268 142 296 150 338 C156 380 160 430 168 470" ${edge(0.3)}/>
    <!-- toe cap (rubber) -->
    <path d="M822 468 C824 410 868 392 906 424 C944 444 962 458 962 480 L940 500 L822 500 Z" fill="${p.sole}"/>
    <path d="M822 468 C824 410 868 392 906 424 C944 444 962 458 962 480" ${edge(0.34)}/>
    <!-- eyestay + laces -->
    <path d="${lc.bandPath}" fill="${p.panel}"/>
    <path d="${lc.bandPath}" ${edge(0.26)}/>
    ${lc.shadows}${lc.bars}${lc.eyelets}
    <!-- heel label -->
    <rect x="86" y="388" width="42" height="26" rx="4" fill="${p.accent}" transform="rotate(-8 107 401)"/>
    ${volume(id, UPPER, { hx: 640, hy: 346, hr: 58, top: 0.16, bottom: 0.26 })}
    <path d="${UPPER}" ${edge(0.4)}/>
    <!-- foxing -->
    <path d="${SOLE}" fill="${p.sole}"/>
    <g clip-path="url(#${id}-sole)">
      <rect x="40" y="440" width="940" height="100" fill="url(#${id}-soleg)"/>
      <rect x="40" y="486" width="940" height="8" fill="${p.accent}"/>
      <path d="M40 512 C300 516 640 516 980 502 L980 560 L40 560 Z" fill="${p.outsole}" opacity=".9"/>
    </g>
    <path d="${SOLE}" ${edge(0.42)}/>
  </g>`;
}

const SILHOUETTES = { runner, court, canvas };

/**
 * Returns an SVG fragment (in the 1000x600 local space) for one sneaker.
 * `id` must be unique per document because gradients/clips are id-based.
 */
export function sneaker(silhouette, palette, id) {
  const draw = SILHOUETTES[silhouette];
  if (!draw) throw new Error(`Unknown silhouette: ${silhouette}`);
  return draw(palette, id);
}
