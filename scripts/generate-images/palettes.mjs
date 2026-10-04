// Colourways for the 12 catalogue products. The `slug` doubles as the output
// filename (src/assets/images/products/<slug>.webp) and matches src/data/products.ts.

export const PRODUCTS = [
  // ── Newly dropped ───────────────────────────────────────────────
  {
    slug: "aero-max-runner",
    silhouette: "runner",
    palette: {
      upper: "#D6D8DA", panel: "#F4F2ED", toe: "#BFC3C6", heel: "#B9BDC0", tongue: "#EDEBE6",
      lining: "#34363A", lace: "#F7F5F0", eyelet: "#7b7f83", accent: "#9BE22E",
      midsole: "#F5F3EF", outsole: "#868A8E",
    },
  },
  {
    slug: "terrain-low",
    silhouette: "court",
    palette: {
      upper: "#E4D3B6", panel: "#C9AE86", toe: "#DFCBA8", heel: "#C9AE86", tongue: "#F0E4CC",
      lining: "#7A5C3E", lace: "#F8F2E5", eyelet: "#9a8466", accent: "#8B5A33",
      midsole: "#F1E7D2", outsole: "#B58F58",
    },
  },
  {
    slug: "motion-wave",
    silhouette: "runner",
    palette: {
      upper: "#9C90DD", panel: "#F1EFF9", toe: "#5E52AB", heel: "#5E52AB", tongue: "#E3DFF4",
      lining: "#2D2951", lace: "#F5F3FB", eyelet: "#473f86", accent: "#A9F03E",
      midsole: "#F4F2F8", outsole: "#2D2951",
    },
  },
  {
    slug: "retro-court",
    silhouette: "court",
    palette: {
      upper: "#F2ECE0", panel: "#B5412E", toe: "#EFE7D8", heel: "#B5412E", tongue: "#FBF6EC",
      lining: "#5A2A1E", lace: "#FFFFFF", eyelet: "#8a8a8a", accent: "#B5412E",
      midsole: "#F5EDDA", outsole: "#C9A66B",
    },
  },
  {
    slug: "shadow-runner",
    silhouette: "runner",
    palette: {
      upper: "#2C2926", panel: "#3C3833", toe: "#1D1B19", heel: "#1D1B19", tongue: "#37332F",
      lining: "#100E0D", lace: "#DAD4C8", eyelet: "#8c7c58", accent: "#D6A63B",
      midsole: "#3A3631", outsole: "#151311",
    },
  },
  {
    slug: "urban-glide",
    silhouette: "canvas",
    palette: {
      upper: "#4A4641", panel: "#3C3935", toe: "#fff", heel: "#3C3935", tongue: "#55504A",
      lining: "#1A1715", lace: "#EDE6D8", eyelet: "#999", accent: "#D6A63B",
      midsole: "#fff", outsole: "#D8CDB8", sole: "#F4EFE4",
    },
  },
  // ── Summer ─────────────────────────────────────────────────────
  {
    slug: "sol-breeze-runner",
    silhouette: "runner",
    palette: {
      upper: "#EBD9C0", panel: "#FFF8EE", toe: "#E58A66", heel: "#E58A66", tongue: "#F6E9D5",
      lining: "#8A5A3C", lace: "#FFFBF3", eyelet: "#c9a07c", accent: "#E4572E",
      midsole: "#FFF8EE", outsole: "#D7B88F",
    },
  },
  {
    slug: "coastline-low",
    silhouette: "canvas",
    palette: {
      upper: "#BFD8E8", panel: "#A8C8DD", toe: "#fff", heel: "#A8C8DD", tongue: "#D7E8F2",
      lining: "#5F87A6", lace: "#FFFFFF", eyelet: "#999", accent: "#2F5D86",
      midsole: "#fff", outsole: "#D9D2C4", sole: "#FBF9F4",
    },
  },
  {
    slug: "dune-trainer",
    silhouette: "court",
    palette: {
      upper: "#E9D0B0", panel: "#C77B4F", toe: "#E3C7A2", heel: "#C77B4F", tongue: "#F4E3C9",
      lining: "#6B3E26", lace: "#FFF9EE", eyelet: "#a98466", accent: "#C77B4F",
      midsole: "#F6EBD6", outsole: "#D3A56B",
    },
  },
  {
    slug: "palm-court",
    silhouette: "court",
    palette: {
      upper: "#F0EBDD", panel: "#8FA58A", toe: "#E9E3D2", heel: "#8FA58A", tongue: "#F8F4E8",
      lining: "#4E5F4B", lace: "#FFFFFF", eyelet: "#8a9a86", accent: "#5E7A5B",
      midsole: "#F6F0E0", outsole: "#BFA77A",
    },
  },
  {
    slug: "citrus-glide",
    silhouette: "runner",
    palette: {
      upper: "#F4E7A0", panel: "#FFFDF3", toe: "#EFCF55", heel: "#EFCF55", tongue: "#FAF3CE",
      lining: "#7A6420", lace: "#FFFFFF", eyelet: "#bda444", accent: "#3F7D5A",
      midsole: "#FFFDF3", outsole: "#CBB36A",
    },
  },
  {
    slug: "marina-canvas",
    silhouette: "canvas",
    palette: {
      upper: "#2B405C", panel: "#1F3049", toe: "#fff", heel: "#1F3049", tongue: "#34506F",
      lining: "#0F1A28", lace: "#F2EDE0", eyelet: "#999", accent: "#D9A441",
      midsole: "#fff", outsole: "#D9D2C4", sole: "#F7F2E6",
    },
  },
];

/** Palettes reused inside editorial scenes. */
export const SCENE_SHOES = {
  graphite: PRODUCTS.find((p) => p.slug === "shadow-runner").palette,
  cloud: PRODUCTS.find((p) => p.slug === "aero-max-runner").palette,
  oat: PRODUCTS.find((p) => p.slug === "terrain-low").palette,
  brick: PRODUCTS.find((p) => p.slug === "retro-court").palette,
  lavender: PRODUCTS.find((p) => p.slug === "motion-wave").palette,
  sage: PRODUCTS.find((p) => p.slug === "palm-court").palette,
  coral: PRODUCTS.find((p) => p.slug === "sol-breeze-runner").palette,
  navy: PRODUCTS.find((p) => p.slug === "marina-canvas").palette,
  sky: PRODUCTS.find((p) => p.slug === "coastline-low").palette,
  butter: PRODUCTS.find((p) => p.slug === "citrus-glide").palette,
  terracotta: PRODUCTS.find((p) => p.slug === "dune-trainer").palette,
  charcoal: PRODUCTS.find((p) => p.slug === "urban-glide").palette,
};
