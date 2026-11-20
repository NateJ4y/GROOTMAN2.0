# GROOTMAN 2.0 — Custom storefront

Responsive React + Vite clothing storefront with a WhatsApp-first enquiry flow.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Required visual assets

Copy the two files from the companion `grootman-visual-assets.zip` into `public/images/`:

- `grootman-hero.webp` — custom crowned-gorilla hero artwork
- `grootman-products.webp` — supplied GROOTMAN apparel collage used by the clothing catalogue

## Before launch

- Set `WHATSAPP_NUMBER` in `src/main.jsx` (international digits only; South Africa starts with `27`).
- Replace concept catalogue entries with confirmed products, prices, sizes, stock and individual product photography.
- Add the official Instagram URL.
- Confirm delivery, returns and payment arrangements.
- Ensure the brand has rights to all campaign artwork.

## Deployment

Vite build command: `npm run build`  
Output directory: `dist`
