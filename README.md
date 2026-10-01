# TECHSOL Consultants website

## Run it on your computer
1. Install Node.js (LTS) from nodejs.org.
2. Open a terminal in this folder and run: `npm install` then `npm run dev`. Open the address it prints.

## Put it online (free, easiest: Netlify)
1. Run `npm run build` – this creates a `dist` folder.
2. Go to app.netlify.com/drop and drag the `dist` folder in. Done. (Vercel: import the folder; build command `npm run build`, output `dist`.)
3. Point techsolconsultants.com to it in the host's "Domain settings".

## Change things (no coding)
- **Text, phone, email, brands, clients, FAQs, manual links:** edit `src/data/site.ts`.
- **Colors:** edit the values at the top of `src/index.css` (the `--primary` line is the teal).
- **Logo / favicon:** replace `public/logo.png` with your emblem (same name).
- **Hero photo:** add `public/images/hero.jpg`.
- **Client photos:** put files in `public/images/` using the names in `clients` in `site.ts`.
- **Prices and quote rules:** edit the `PRICES` block at the top of `src/lib/quote.ts` (all PKR).
After any change run `npm run build` and upload `dist` again.
