# AK Digital Services — Landing Page

A premium, single-page website for **AK Digital Services** (Ballia, Begusarai, Bihar), built to be scanned via QR code from a visiting card and to build instant trust.

## Files

```
index.html      Main landing page (all sections)
style.css       Design system + styles
script.js       Interactions: nav, dark mode, counters, FAQ, save contact, share
favicon.svg     Browser tab icon
assets/logo.svg Brand logo (also used as favicon source)
manifest.json   PWA manifest (installable on phones)
sw.js           Service worker (offline caching)
robots.txt      Search engine crawl rules
sitemap.xml     Search engine sitemap
privacy.html    Privacy policy page
terms.html      Terms of service page
```

## Before you publish — replace these placeholders

| What | Where | Find |
|---|---|---|
| Phone number | `index.html`, `script.js` | `919000000000` / `+91 90000 00000` |
| Email | `index.html`, `privacy.html`, `terms.html` | `contact@akdigitalservices.in` |
| Live domain | `index.html`, `manifest.json`, `robots.txt`, `sitemap.xml` | `akdigitalservices.in` |
| Google Maps location | `index.html` → `.map-frame iframe src` and "Get Directions" link | `Ballia,Begusarai,Bihar` — replace with your exact shop's Google Maps share link/pin for pinpoint accuracy |
| Shop/gallery photos | Gallery section | Currently styled placeholder tiles — swap in real photos of your shop for maximum trust |
| Testimonial names | Testimonials section | Replace with real customer names/quotes once you have permission to use them |

## Running it locally

No build step needed — it's plain HTML/CSS/JS.

1. Open `index.html` directly in a browser, **or**
2. Serve the folder locally for full PWA/service-worker behavior:
   ```
   npx serve .
   ```

## Deploying (GitHub Pages)

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages** → set source to the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo>/`.
4. Update the domain placeholders above to match your final URL.

## Generating the QR code for your visiting card

Once live, generate a QR code pointing at your homepage URL using any QR generator (e.g. the free tool at qr-code-generator.com), using colors `#0F172A` (dark) on `#F8FAFC` (light) to match the brand, and test-scan it before printing.

## Notes on scope

This delivery focuses on the core, production-ready **website** — the most important asset for your QR-code visiting card. The extended brand kit mentioned in the brief (physical business card layout, letterhead, invoice/receipt templates, social banners) is a separate print/graphic-design deliverable; happy to build any of those next as follow-up files if useful — just let me know which ones matter most first.
