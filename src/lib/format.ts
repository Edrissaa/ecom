import { site } from "@/data/site";

const currency = new Intl.NumberFormat(site.locale, {
  style: "currency",
  currency: site.currency,
});

export const formatPrice = (value: number): string => currency.format(value);
