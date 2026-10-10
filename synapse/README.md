# Synapse AI — marketing site

Production build of the Stitch "Synapse AI" design. **Next.js 16 · React 19 · Tailwind CSS 4 · shadcn/ui-style components on Radix · Lucide.**

```bash
cd synapse
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

- **Design system:** every colour role, radius (1/2/3rem), spacing and type-scale token from the Stitch export lives in `src/app/globals.css` (`@theme`). Fonts: Plus Jakarta Sans + Inter via `next/font`.
- **Components:** `src/components/ui/` (Button, Badge, Card, Input, Label, Select, Tabs, Slider, Reveal) follow shadcn conventions (`cva`, `cn`, Radix primitives, `components.json`). Page sections are in `src/components/sections/`; all copy is in `src/lib/content.ts`.
- **Motion:** deliberately light — hover lift on cards/buttons, 650ms section reveals (below-the-fold only, off for reduced motion), fade on tab/dialog changes.
- **Before launch:** the images are the Stitch export URLs (`lh3.googleusercontent.com`) — replace with your own assets. Client logos and testimonials are placeholders. The consultation and newsletter forms are demo handlers; connect them to your CRM/email provider.
