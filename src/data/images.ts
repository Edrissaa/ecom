// Central image registry.
//
// Every picture on the storefront is declared here, so replacing the generated
// illustrations with real photography is a one-file job: overwrite the files in
// src/assets/images (same aspect ratio) or point an entry at a different import.
// Static imports give Next/Image intrinsic width/height and a blur placeholder.
//
// Regenerate the stand-in art with `npm run generate:images`.
import hero1 from "@/assets/images/hero/hero-1.webp";
import hero2 from "@/assets/images/hero/hero-2.webp";
import hero3 from "@/assets/images/hero/hero-3.webp";
import promo1 from "@/assets/images/promo/promo-1.webp";
import promo2 from "@/assets/images/promo/promo-2.webp";
import promo3 from "@/assets/images/promo/promo-3.webp";
import mosaicTall from "@/assets/images/mosaic/mosaic-tall.webp";
import mosaicTop from "@/assets/images/mosaic/mosaic-top.webp";
import mosaicBottom from "@/assets/images/mosaic/mosaic-bottom.webp";
import mosaicWide from "@/assets/images/mosaic/mosaic-wide.webp";
import bannerCta from "@/assets/images/banner/banner-cta.webp";

import aeroMaxRunner from "@/assets/images/products/aero-max-runner.webp";
import terrainLow from "@/assets/images/products/terrain-low.webp";
import motionWave from "@/assets/images/products/motion-wave.webp";
import retroCourt from "@/assets/images/products/retro-court.webp";
import shadowRunner from "@/assets/images/products/shadow-runner.webp";
import urbanGlide from "@/assets/images/products/urban-glide.webp";
import solBreezeRunner from "@/assets/images/products/sol-breeze-runner.webp";
import coastlineLow from "@/assets/images/products/coastline-low.webp";
import duneTrainer from "@/assets/images/products/dune-trainer.webp";
import palmCourt from "@/assets/images/products/palm-court.webp";
import citrusGlide from "@/assets/images/products/citrus-glide.webp";
import marinaCanvas from "@/assets/images/products/marina-canvas.webp";

import type { Photo } from "@/types";

export const heroImages = {
  everyday: {
    src: hero1,
    alt: "A cloud-grey runner with neon-green accents resting on a cream plinth in a terracotta room, window light across the wall.",
  },
  season: {
    src: hero2,
    alt: "A coral and sand runner floating in front of a pale sun disc against a sage-green wall.",
  },
  street: {
    src: hero3,
    alt: "A sage and cream court sneaker on a stack of kraft shoe boxes, striped light falling across a dark brown wall.",
  },
} satisfies Record<string, Photo>;

export const promoImages = {
  move: {
    src: promo1,
    alt: "A grey and white runner tilted upward against a teal wall lit by a window.",
  },
  drops: {
    src: promo2,
    alt: "A cream and sage court sneaker on a round plinth beneath a pair of nested arches.",
  },
  street: {
    src: promo3,
    alt: "A navy canvas sneaker on warm sand beneath palm-frond shadows and a pale sun.",
  },
} satisfies Record<string, Photo>;

export const mosaicImages = {
  tall: {
    src: mosaicTall,
    alt: "An oat-coloured sneaker on a wooden stool with a grey runner on the floor beside it.",
  },
  top: {
    src: mosaicTop,
    alt: "Close-up of a navy canvas sneaker with a mustard stripe against a golden wall.",
  },
  bottom: {
    src: mosaicBottom,
    alt: "A cream and brick-red court sneaker in front of a pale blue wall with window light.",
  },
  wide: {
    src: mosaicWide,
    alt: "Close-up of a cream and sage court sneaker in a sunlit room with an arched alcove.",
  },
} satisfies Record<string, Photo>;

export const bannerImage: Photo = {
  src: bannerCta,
  alt: "A brick-red court sneaker and a grey runner facing each other across a warm, striped-light room.",
};

export const productImages = {
  "aero-max-runner": {
    src: aeroMaxRunner,
    alt: "Aero Max Runner in cloud grey and white with neon-green accents.",
  },
  "terrain-low": {
    src: terrainLow,
    alt: "Terrain Low in oat suede with a caramel gum sole.",
  },
  "motion-wave": {
    src: motionWave,
    alt: "Motion Wave runner in lavender and violet with lime accents.",
  },
  "retro-court": {
    src: retroCourt,
    alt: "Retro Court in cream leather with brick-red panels and a gum sole.",
  },
  "shadow-runner": {
    src: shadowRunner,
    alt: "Shadow Runner in all-black mesh with gold details.",
  },
  "urban-glide": {
    src: urbanGlide,
    alt: "Urban Glide low-top in charcoal canvas with a cream sole and mustard stripe.",
  },
  "sol-breeze-runner": {
    src: solBreezeRunner,
    alt: "Sol Breeze Runner in sand mesh with coral overlays.",
  },
  "coastline-low": {
    src: coastlineLow,
    alt: "Coastline Low canvas sneaker in sky blue with a white sole.",
  },
  "dune-trainer": {
    src: duneTrainer,
    alt: "Dune Trainer in sand leather with terracotta panels.",
  },
  "palm-court": {
    src: palmCourt,
    alt: "Palm Court in cream leather with sage-green panels.",
  },
  "citrus-glide": {
    src: citrusGlide,
    alt: "Citrus Glide runner in butter yellow with forest-green accents.",
  },
  "marina-canvas": {
    src: marinaCanvas,
    alt: "Marina Canvas low-top in deep navy with a cream sole and gold stripe.",
  },
} satisfies Record<string, Photo>;

export type ProductImageKey = keyof typeof productImages;
