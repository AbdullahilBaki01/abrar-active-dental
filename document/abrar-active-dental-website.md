# Abrar Active Dental — Website Kit for Antigravity

Contains: (0) clinic details to fill in, (1) the prompt to paste into Antigravity, (2) project documentation to save as `DOCS.md` in the repo.

---

## 0. FILL THESE IN FIRST (replace every [BRACKET])

I could not read the Facebook page (Facebook blocks automated access), so none of these are filled. Copy them from the FB page "About" section and photos.

- Clinic name: Abrar Active Dental
- Tagline: Modern, Hygienic & Caring Dental Care
- Address: House#75, Block#E, Road#2, 1216 Kalshi Rd, Dhaka 1216
- Phone / WhatsApp: 01718-768931 (+880 1718-768931)
- Email: info@abraractivedental.com
- Opening hours: Sat–Thu: 5:00 PM – 10:00 PM, Friday: 4:00 PM – 9:00 PM
- Facebook page: https://www.facebook.com/abraractivedentalbd
- Google Maps link: https://maps.app.goo.gl/ZLPLNZRx3j74CauK6
- Doctors: Dr. Arifa Rahman (BDS, PGT, BMDC Registered Dental Surgeon)
- Services actually offered: 11 core procedures (Scaling, Fillings, RCT, Extractions, Braces, Whitening, Crowns, Dentures, Pediatric, Implants, X-Ray)
- Fees / pricing shown publicly? No, consultation and treatment quotation based
- Logo + brand colors: Fresh medical teal, deep navy text, warm amber CTA accents
- Photos: Public images in /public/images/
- Languages: English + Bangla toggle

---

## 1. PROMPT (paste this into Antigravity)

```
You are a senior front-end engineer and UI designer. Build a complete, production-ready, mobile-first website for a dental clinic in Bangladesh.

## CLIENT
Name: Abrar Active Dental
Facebook: https://www.facebook.com/abraractivedentalbd
Address: House#75, Block#E, Road#2, 1216 Kalshi Rd, Dhaka 1216
Phone/WhatsApp: +880 1718-768931
Hours: Sat–Thu: 5:00 PM – 10:00 PM, Fri: 4:00 PM – 9:00 PM
Google Maps: https://maps.app.goo.gl/ZLPLNZRx3j74CauK6
Doctors: Dr. Arifa Rahman (Dental Surgeon & Consultant)

## GOAL
Turn visitors (mostly on phones, coming from Facebook and Google) into booked appointments. Build trust fast: clean, calm, professional, hygienic feel. Primary actions everywhere: "Book Appointment", "Call Now", "WhatsApp".

## TECH STACK
- React + Vite + Tailwind CSS (frontend only, no backend required for v1)
- react-router-dom for routing, react-helmet-async for SEO
- Framer Motion for subtle animations only
- lucide-react for icons
- i18n: English + Bangla toggle (simple context + JSON files, no heavy library)
- Appointment form: validates client-side, then opens WhatsApp with a prefilled message (wa.me link) AND offers a "Call instead" button. Structure the code so a backend/email endpoint can be added later.
- Deploy target: Vercel or Netlify (include config)

## PAGES / SECTIONS
Single-page home with anchored sections + separate pages where noted.

1. Sticky header: logo, nav (Home, Services, Doctors, Gallery, Reviews, Contact), language toggle, "Book Appointment" button. Mobile: hamburger menu + a sticky bottom bar with Call / WhatsApp / Book.
2. Hero: strong headline, one-line subtext, two CTAs (Book Appointment, Call Now), clinic photo or illustration, trust chips (e.g. "Experienced doctors", "Modern equipment", "Sterilized instruments") — only claims I confirm.
3. Services grid (cards with icon + short description + "Book this"): General checkup & cleaning (scaling), Fillings, Root canal treatment, Tooth extraction / wisdom tooth, Braces & orthodontics, Crowns & bridges, Dentures, Teeth whitening, Pediatric dentistry, Dental implants, X-ray. Make the list data-driven from `src/data/services.js` so I can delete/add items easily.
4. Why choose us: 4–6 points with icons.
5. Doctors: cards with photo, name, degree, speciality, "Book with Dr. X".
6. Before/After or Gallery: responsive grid with lightbox; placeholders until I add photos.
7. Patient reviews: carousel; data from `src/data/reviews.js`; include a "Review us on Facebook" link.
8. FAQ: accordion (first visit, pain, cost, kids, emergency, how to book).
9. Appointment section: form (name, phone, preferred date, preferred time, service dropdown, message) → WhatsApp prefilled message.
10. Contact + Location: address, phone, hours (highlight "Open now / Closed" based on current time), embedded Google Map, Facebook link.
11. Footer: quick links, hours, socials, copyright, small disclaimer.
12. 404 page.
Optional pages: /services/:slug (one page per service for SEO), /privacy.

## DESIGN
- Look: clean, modern, trustworthy medical — lots of white space, soft rounded cards, subtle shadows.
- Palette: [BRAND COLORS or: fresh teal/aqua primary, deep navy text, white background, a warm accent for CTAs]. Define as CSS variables + Tailwind theme tokens.
- Typography: Inter / Poppins for English; Hind Siliguri or Noto Sans Bengali for Bangla. Load via Google Fonts with display=swap.
- Buttons: large tap targets (min 44px), clear hover/focus states.
- Animations: gentle fade/slide on scroll; respect prefers-reduced-motion.
- Dark mode not required.
- Images: use placeholder images with descriptive alt text and a clearly marked `/public/images/` folder where I'll drop real photos. Lazy-load below the fold, serve WebP where possible.

## FUNCTIONAL REQUIREMENTS
- Fully responsive (360px → 1440px). Test mobile first.
- Language toggle persists in localStorage.
- "Open now" badge computed from hours config in `src/data/clinic.js`.
- All clinic info (name, phone, address, hours, socials, map) lives in ONE file `src/data/clinic.js` — nothing hard-coded in components.
- Click-to-call (`tel:`) and WhatsApp (`wa.me`) links everywhere relevant.
- Form validation: Bangladeshi phone number format (01XXXXXXXXX or +8801XXXXXXXXX), required fields, friendly error messages in both languages.
- Floating WhatsApp button (bottom-right, above the mobile bottom bar).

## SEO & PERFORMANCE
- Semantic HTML, one H1 per page, meta title/description per page, Open Graph + Twitter tags (use clinic photo).
- JSON-LD structured data: `Dentist` / `LocalBusiness` schema with address, phone, hours, geo, sameAs (Facebook).
- sitemap.xml, robots.txt, favicon set, manifest.
- Target Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO (mobile).
- Accessibility: WCAG AA contrast, keyboard navigation, aria-labels, visible focus rings, alt text.

## PROJECT STRUCTURE
src/
  components/ (Header, Hero, Services, Doctors, Gallery, Reviews, FAQ, AppointmentForm, Contact, Footer, FloatingActions, ...)
  pages/ (Home, ServiceDetail, NotFound, Privacy)
  data/ (clinic.js, services.js, doctors.js, reviews.js, faqs.js)
  i18n/ (en.json, bn.json, LanguageContext.jsx)
  hooks/ (useOpenNow.js)
  utils/ (whatsapp.js, validators.js)
public/images/, public/sitemap.xml, public/robots.txt

## DELIVERABLES
1. Working project that runs with `npm install && npm run dev`.
2. Clean, commented code; no unused dependencies.
3. README.md with setup, how to edit clinic info/services/doctors/reviews, how to add photos, how to switch language text, and how to deploy.
4. Use realistic placeholder content where my info is missing and mark each with `TODO:` so I can find it (search "TODO").
5. Do NOT invent claims (awards, years of experience, patient counts, prices, certifications). Use neutral placeholder text marked TODO instead.

## WORKFLOW
First produce a short plan (sitemap, component list, color palette). Then build everything. Then run the app, check it at mobile and desktop widths, fix any issues, and give me a summary of what to fill in.
```

---

## 2. DOCUMENTATION (save as `DOCS.md`)

### 2.1 Overview
**Project:** Official website for Abrar Active Dental (Bangladesh).
**Purpose:** Present services and doctors, build trust, and make booking an appointment effortless (call, WhatsApp, or form).
**Audience:** Local patients, mostly on mobile, arriving from Facebook, Google Maps, or search.
**Success metrics:** Click-to-call taps, WhatsApp opens, form submissions, mobile Lighthouse score, Google "dentist near me" visibility.

### 2.2 Sitemap
| Route | Content |
|---|---|
| `/` | Hero, Services, Why Us, Doctors, Gallery, Reviews, FAQ, Appointment, Contact |
| `/services/:slug` | Detail page per service (SEO landing) |
| `/privacy` | Basic privacy note |
| `*` | 404 |

### 2.3 Features
- Bilingual (English / Bangla) with persistent toggle
- Appointment form → prefilled WhatsApp message
- Click-to-call, floating WhatsApp, mobile sticky action bar
- "Open now / Closed" badge from configured hours
- Embedded Google Map
- Gallery with lightbox, reviews carousel, FAQ accordion
- Structured data (`Dentist` schema) for local SEO

### 2.4 Tech stack
React, Vite, Tailwind CSS, react-router-dom, react-helmet-async, Framer Motion, lucide-react. No backend in v1.

### 2.5 Content management (no CMS)
All editable content is in `src/data/`:
- `clinic.js` — name, phone, WhatsApp number, address, hours, map link, socials
- `services.js` — list of services (title, slug, icon, short/long description, EN + BN)
- `doctors.js` — name, degree, speciality, photo path
- `reviews.js` — patient name (or initials), text, rating
- `faqs.js` — questions and answers (EN + BN)
Translations for UI text live in `src/i18n/en.json` and `bn.json`.

### 2.6 Design system
- **Colors (tokens):** primary, primary-dark, accent (CTA), ink (text), surface, muted. Defined in `tailwind.config.js` and CSS variables.
- **Type:** Poppins/Inter (EN), Hind Siliguri/Noto Sans Bengali (BN).
- **Radius/shadow:** 12–20px radius, soft shadows.
- **Spacing:** 8px base grid; section padding 64–96px desktop, 40–56px mobile.
- **Breakpoints:** Tailwind defaults (sm 640, md 768, lg 1024, xl 1280).
- **Motion:** fade/slide only, disabled for `prefers-reduced-motion`.

### 2.7 Appointment flow
1. User fills name, phone, date, time, service, message.
2. Client-side validation (BD phone format).
3. On submit, build message in `utils/whatsapp.js`:
   `Hello Abrar Active Dental, I'd like to book an appointment. Name: …, Phone: …, Service: …, Date/Time: …, Note: …`
4. Open `https://wa.me/<number>?text=<encoded message>`.
5. Show success state + "Call instead" button.
Future upgrade: POST to a serverless function / email service / Google Sheet.

### 2.8 SEO checklist
- Unique title + meta description per page
- One H1 per page, logical heading order
- JSON-LD `Dentist` with name, address, phone, openingHours, geo, sameAs (Facebook)
- sitemap.xml, robots.txt, canonical URLs
- OG image (clinic photo, 1200×630)
- Compressed WebP images with alt text
- Register site in Google Search Console and claim/update the Google Business Profile with the website URL

### 2.9 Accessibility checklist
Contrast AA, keyboard-friendly nav and accordion, visible focus, aria-labels on icon buttons, form labels and error text, alt text on all images, language attribute switches with the toggle (`lang="bn"` / `"en"`).

### 2.10 Performance checklist
Lazy-load images and gallery, font `display=swap`, code-split routes, no heavy libraries, preload hero image, target mobile Lighthouse ≥ 90.

### 2.11 Deployment
1. Push to GitHub.
2. Import into Vercel or Netlify (build: `npm run build`, output: `dist`).
3. Add SPA rewrite (all routes → `index.html`).
4. Connect custom domain (e.g. a .com or .com.bd) and enable HTTPS.
5. Update canonical URL, sitemap, and schema with the final domain.

### 2.12 Launch checklist
- [ ] All `TODO:` markers resolved
- [ ] Real phone/WhatsApp/address/hours verified
- [ ] Real doctor info and photos added (with their permission)
- [ ] Only true claims published (no invented stats or awards)
- [ ] Patient photos/reviews used only with consent
- [ ] Bangla text proofread by a native speaker
- [ ] Tested on a real Android phone and iPhone
- [ ] Lighthouse scores checked
- [ ] Google Business Profile + Facebook page link to the site

### 2.13 Future improvements
Online booking with real slots (backend + calendar), blog / dental tips (SEO), patient portal, SMS reminders, Facebook Pixel / GA4 analytics, more languages.
