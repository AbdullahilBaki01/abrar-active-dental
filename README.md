# Abrar Active Dental — Official Website

> **Production-ready, mobile-first website for Abrar Active Dental (Bangladesh).**
> Built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons. Features full English/Bangla bilingual toggle, client-side WhatsApp appointment booking flow, live "Open Now / Closed" calculation, and medical SEO structured data (`Dentist` Schema).

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The site will start at `http://localhost:3000/`.

### 3. Build for Production
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

---

## 📁 Project Architecture

```
abrar/
├── public/
│   ├── images/              # Clinic photos, doctor portraits, and gallery assets
│   ├── favicon.svg          # Dental SVG favicon
│   ├── robots.txt           # Search engine crawler permissions
│   ├── sitemap.xml          # Canonical XML sitemap for SEO
│   ├── site.webmanifest     # Web app manifest for mobile home screen
│   └── _redirects           # Netlify SPA routing rules
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Sticky header + language toggle + hamburger menu
│   │   ├── Hero.jsx         # Mobile-first hero + Open Now badge + CTAs
│   │   ├── WhyChooseUs.jsx  # 5 Hospital hygiene & medical trust pillars
│   │   ├── Services.jsx     # Data-driven dental services grid + "Book this" hook
│   │   ├── Doctors.jsx      # Doctor profiles + credentials + "Book with Dr. X"
│   │   ├── Gallery.jsx      # Filterable photo grid + accessible modal lightbox
│   │   ├── Reviews.jsx      # Patient reviews carousel + Facebook link
│   │   ├── FAQ.jsx          # Accessible accordion + direct contact banner
│   │   ├── AppointmentForm.jsx # Phone-validated form → prefilled WhatsApp link
│   │   ├── Contact.jsx      # Clinic address, hours schedule, embedded Google Maps
│   │   ├── Footer.jsx       # Medical disclaimer, quick links, copyright
│   │   ├── MobileBottomBar.jsx # Sticky bottom action bar (Call, WhatsApp, Book)
│   │   ├── FloatingActions.jsx # Floating pulsing WhatsApp chat button
│   │   └── SEO.jsx          # Helmet meta tags, Open Graph & JSON-LD Dentist schema
│   ├── data/                # ALL EDITABLE CONTENT (No CMS needed)
│   │   ├── clinic.js        # Single source of truth: phone, WhatsApp, address, hours
│   │   ├── services.js      # List of all 11 dental treatments (EN + BN)
│   │   ├── doctors.js       # Doctor profiles, degrees, BMDC registration
│   │   ├── reviews.js       # Verified patient testimonials
│   │   └── faqs.js          # Frequently asked questions
│   ├── hooks/
│   │   └── useOpenNow.js    # Calculates real-time "Open Now" / "Closed" status (Asia/Dhaka)
│   ├── i18n/
│   │   ├── en.json          # English interface translations
│   │   ├── bn.json          # Bangla interface translations
│   │   └── LanguageContext.jsx # Bilingual state provider with localStorage persistence
│   ├── pages/
│   │   ├── Home.jsx         # Main one-page landing layout
│   │   ├── ServiceDetail.jsx # SEO landing pages per treatment (/services/:slug)
│   │   ├── Privacy.jsx      # Patient medical confidentiality notice
│   │   └── NotFound.jsx     # Friendly 404 page with emergency call actions
│   ├── utils/
│   │   ├── validators.js    # Bangladeshi mobile number (01XXXXXXXXX) validator
│   │   └── whatsapp.js      # Formatted WhatsApp message & wa.me URL generator
│   ├── App.jsx              # Application router & layout structure
│   ├── index.css            # Tailwind base, typography & responsive tokens
│   └── main.jsx             # React DOM entry point
├── vercel.json              # Vercel SPA routing configuration
├── netlify.toml             # Netlify build & redirect configuration
└── tailwind.config.js       # Medical teal & navy design system tokens
```

---

## 🛠️ How to Edit Content (Search for `TODO`)

### 1. Clinic Information, Phone & Location
Open [`src/data/clinic.js`](file:///f:/abrar/src/data/clinic.js):
- **Phone / WhatsApp:** Update `phone`, `phoneRaw`, and `whatsapp` numbers.
- **Address:** Update `address.line1`, `address.area`, `address.city`, and `address.fullAddress`.
- **Opening Hours:** Update `schedule` and `displayHours`. The "Open Now" badge automatically recalibrates.
- **Maps:** Update `googleMapsUrl` (share link) and `googleMapsEmbedUrl` (iframe source).
- **Facebook:** Update `facebookUrl`.

### 2. Dental Services
Open [`src/data/services.js`](file:///f:/abrar/src/data/services.js):
- Each service is an object with `id`, `slug`, `titleEn`, `titleBn`, `shortDescEn`, `shortDescBn`, `benefitsEn`, `stepsEn`, etc.
- To **add** a service, duplicate an entry and update the slug and titles.
- To **remove** a service, simply delete its object from the array.

### 3. Doctors & Specialists
Open [`src/data/doctors.js`](file:///f:/abrar/src/data/doctors.js):
- Update `name`, `title`, `degree`, `bmdcRegNo`, and `speciality`.
- Set `photo` to `/images/your-doctor-photo.jpg`.

### 4. Adding Real Photos
Drop your photos into [`public/images/`](file:///f:/abrar/public/images/):
- Clinic main photo: `hero-clinic.jpg` (or update path in `Hero.jsx` / `clinic.js`)
- Doctor photos: `doctor-1.jpg`, `doctor-2.jpg`
- Gallery photos: `gallery-1.jpg` through `gallery-6.jpg` (update paths in `src/components/Gallery.jsx`)
- Social share preview (1200×630): `og-image.jpg`

### 5. UI Translations
- English strings: [`src/i18n/en.json`](file:///f:/abrar/src/i18n/en.json)
- Bengali strings: [`src/i18n/bn.json`](file:///f:/abrar/src/i18n/bn.json)

---

## 📱 Mobile-First Features

- **Tap Targets:** All buttons and inputs meet min 44px touch guidelines.
- **Sticky Bottom Action Bar:** Persistent on mobile screens with instant taps for **Call Now**, **WhatsApp**, and **Book Visit**.
- **Floating WhatsApp:** Fixed button on bottom-right with subtle pulse indicator.
- **Bangladeshi Phone Validation:** Validates `01XXXXXXXXX` and `+8801XXXXXXXXX` with friendly bilingual error prompts.
- **Client-Side WhatsApp Integration:** Forms build a clean WhatsApp appointment message and open `wa.me` directly, backed by an immediate "Call instead" alternative.

---

## 🌐 Deployment

### Deploying to Vercel
1. Push code to your GitHub / GitLab repository.
2. In Vercel, click **"Add New Project"** and select the repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`. Output Directory: `dist`.
5. Click **Deploy**. SPA rewrites are already handled by `vercel.json`.

### Deploying to Netlify
1. Connect repository to Netlify.
2. Build command: `npm run build`. Publish directory: `dist`.
3. SPA redirects are automatically configured via `public/_redirects` and `netlify.toml`.

---

## 📋 Launch Checklist (`TODO` Search)

- [x] Clinic WhatsApp & hotline number configured (+880 1718-768931).
- [x] Clinic address and area configured (House#75, Block#E, Road#2, 1216 Kalshi Rd, Dhaka 1216).
- [x] Primary dental surgeon configured (Dr. Arifa Rahman).
- [x] Friday hours confirmed (4:00 PM – 9:00 PM) and maps geo coordinates updated.
- [ ] Add verified BMDC registration number for Dr. Arifa Rahman.
- [ ] Replace SVG illustrations in `/public/images/` with official clinic and doctor photographs.
- [ ] Connect custom domain in Vercel/Netlify and update `sitemap.xml` / canonical tags.
