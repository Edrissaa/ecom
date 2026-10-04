import { site } from "@/data/site";
import { formatPrice } from "@/lib/format";

export interface HelpSection {
  heading: string;
  body: string[];
}

export interface HelpPage {
  slug: string;
  title: string;
  intro: string;
  sections: HelpSection[];
  table?: { caption: string; headers: string[]; rows: string[][] };
}

// NOTE: sample copy for a fictional brand. Have policy pages reviewed before launch.
export const helpPages: HelpPage[] = [
  {
    slug: "shipping",
    title: "Shipping",
    intro: "Fast, tracked delivery on every order — and free over a certain spend.",
    sections: [
      {
        heading: "Delivery options",
        body: [
          `Standard delivery takes 3–5 working days and is free on orders over ${formatPrice(site.freeShippingThreshold)}. Below that it is a flat ${formatPrice(site.standardShipping)}.`,
          "Express delivery (1–2 working days) is available at checkout for $19.95.",
        ],
      },
      {
        heading: "Tracking",
        body: ["You'll receive a dispatch email with a tracking link as soon as your order leaves our warehouse."],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns Policy",
    intro: "Not quite right? Send them back within 30 days.",
    sections: [
      {
        heading: "How returns work",
        body: [
          "Unworn pairs in their original box can be returned within 30 days of delivery for a full refund or exchange.",
          "Start a return by contacting us with your order number — we'll send you a prepaid label.",
        ],
      },
      {
        heading: "Refunds",
        body: ["Refunds go back to your original payment method within 5–7 working days of us receiving the pair."],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    intro: "We only collect what we need to get your order to you.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "Your name, delivery address, email and order details, so we can fulfil and support your purchase.",
          "Basic, anonymous site analytics to understand which pages are useful.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          `You can ask us to access, correct or delete your data at any time by emailing ${site.email}. You can unsubscribe from marketing emails with one click.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    intro: "The small print, kept as short as we can.",
    sections: [
      {
        heading: "Orders",
        body: [
          "An order is accepted when we send your dispatch confirmation. Prices are shown in US dollars and include applicable taxes where required.",
        ],
      },
      {
        heading: "Availability",
        body: ["We do our best to keep stock accurate. If a pair sells out after you order, we'll let you know and refund you in full."],
      },
    ],
  },
  {
    slug: "faqs",
    title: "FAQs",
    intro: "Quick answers to the questions we hear most.",
    sections: [
      {
        heading: "How do Soleva sneakers fit?",
        body: ["Most styles fit true to size. If you're between sizes, we suggest sizing up in our runners and staying true in our court and canvas styles."],
      },
      {
        heading: "Can I change my order?",
        body: ["Contact us within an hour of ordering and we'll do our best to update it before it ships."],
      },
      {
        heading: "How do I look after my pair?",
        body: ["Brush off dirt, spot-clean with a damp cloth and mild soap, and let them air-dry away from direct heat."],
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact Us",
    intro: "A real person will get back to you, usually within one working day.",
    sections: [
      {
        heading: "Email",
        body: [`Write to ${site.email} with your order number if you have one.`],
      },
      {
        heading: "Hours",
        body: ["Monday to Friday, 9am–6pm."],
      },
    ],
  },
  {
    slug: "track-order",
    title: "Track Order",
    intro: "Find out exactly where your pair is.",
    sections: [
      {
        heading: "Use your tracking link",
        body: [
          "Every dispatch email includes a tracking link. Click it to see live updates from the carrier.",
          `Can't find the email? Check your spam folder, or contact us at ${site.email} with your order number and we'll resend it.`,
        ],
      },
    ],
  },
  {
    slug: "size-guide",
    title: "Size Guide",
    intro: "Measure your foot, find your size.",
    sections: [
      {
        heading: "How to measure",
        body: [
          "Stand on a sheet of paper against a wall, mark the longest point of your foot, then measure from the wall to the mark.",
          "Measure both feet and use the larger measurement. If you're between sizes, size up.",
        ],
      },
    ],
    table: {
      caption: "Unisex sneaker sizing",
      headers: ["US men's", "US women's", "UK", "EU", "Foot length (cm)"],
      rows: [
        ["6", "7.5", "5.5", "39", "24.0"],
        ["7", "8.5", "6", "40", "24.6"],
        ["8", "9.5", "7", "41", "25.4"],
        ["9", "10.5", "8", "42.5", "26.0"],
        ["10", "11.5", "9", "44", "26.7"],
        ["11", "12.5", "10", "45", "27.3"],
        ["12", "13.5", "11", "46", "28.0"],
      ],
    },
  },
];

export const getHelpPage = (slug: string) => helpPages.find((p) => p.slug === slug);
