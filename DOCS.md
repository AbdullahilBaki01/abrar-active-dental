# Project Documentation — Abrar Active Dental

## 1. Overview
- **Project:** Official website for Abrar Active Dental (Bangladesh).
- **Purpose:** Present services and doctors, build trust, and make booking an appointment effortless (call, WhatsApp, or form).
- **Audience:** Local patients, mostly on mobile, arriving from Facebook, Google Maps, or search.
- **Success Metrics:** Click-to-call taps, WhatsApp opens, form submissions, mobile Lighthouse score, Google "dentist near me" visibility.

---

## 2. Sitemap & Routing
| Route | Content |
|---|---|
| `/` | Hero, Services, Why Us, Doctors, Gallery, Reviews, FAQ, Appointment, Contact |
| `/services/:slug` | Detail page per service (SEO landing with `MedicalProcedure` schema) |
| `/privacy` | Patient confidentiality & privacy terms |
| `*` | 404 Not Found page with emergency contact buttons |

---

## 3. Features
- **Bilingual (English / Bangla):** Simple zero-dependency Context with `localStorage` persistence and automatic HTML `lang` & font switching (`Hind Siliguri` for Bangla).
- **Appointment Form Flow:** Client-side validation for Bangladeshi phone format (`01XXXXXXXXX` or `+8801XXXXXXXXX`), builds prefilled WhatsApp message (`wa.me`), and provides a fallback "Call instead" button.
- **Click-to-Call & WhatsApp Everywhere:** Prominent `tel:` and `wa.me` actions across hero, service cards, mobile bottom bar, and floating action button.
- **"Open Now / Closed" Badge:** Real-time calculation based on local Bangladesh time (Asia/Dhaka UTC+6) against the clinic schedule in `src/data/clinic.js`.
- **Interactive Map:** Embedded Google Map with direct "Get Directions" link.
- **Gallery & Lightbox:** Filterable gallery with responsive modal lightbox, keyboard navigation (Escape, arrows), and touch support.
- **Reviews Carousel:** Testimonial slider with direct "Review us on Facebook" CTA.
- **FAQ Accordion:** Accessible accordion covering first visits, pain control, costs, children, emergencies, and sterilization.
- **Structured Data:** High-detail JSON-LD `Dentist` and `MedicalProcedure` schemas for local SEO.

---

## 4. Tech Stack
- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS 3 (configured with custom medical teal, navy, and soft shadows)
- **Routing:** react-router-dom 6 (with scroll restoration)
- **SEO & Meta:** react-helmet-async 2 + JSON-LD
- **Icons:** lucide-react
- **Fonts:** Poppins & Inter (English), Hind Siliguri (Bangla) via Google Fonts (`display=swap`)
- **Backend:** Frontend-only for v1 (ready for REST/Serverless endpoint)

---

## 5. Content Management (No CMS Required)
All editable content is organized cleanly in `src/data/`:
- `clinic.js` — Clinic name, hotline, WhatsApp number, address, opening hours schedule, Google Maps link, Facebook URL.
- `services.js` — Complete list of dental treatments (title, slug, icon, short & long description, benefits, procedure steps, EN + BN).
- `doctors.js` — Doctor profiles, titles, degrees, BMDC registration number, consultation hours, photo paths.
- `reviews.js` — Patient names, locations, ratings, treatment types, and comments.
- `faqs.js` — Questions and answers in English and Bangla.
- `src/i18n/en.json` & `bn.json` — All static UI strings.

---

## 6. Design System Tokens
- **Primary:** Teal `#0d9488` (`brand-600`), `#0f766e` (`brand-700`), `#115e59` (`brand-800`), `#f0fdfa` (`brand-50`)
- **Accent (CTAs):** Amber `#f59e0b` (`accent-500`), `#d97706` (`accent-600`)
- **Text & Ink:** Deep Navy `#0f172a` (`navy-900`), `#1e293b` (`navy-800`), `#334155` (`slate-700`)
- **Surface:** Clean White `#ffffff`, Dental Ice `#f8fafc`
- **Border Radius:** `rounded-xl` (16px), `rounded-2xl` (20px), `rounded-3xl` (28px)
- **Elevation:** `shadow-soft` (subtle elevation), `shadow-soft-lg` (cards), `shadow-floating` (floating buttons)
- **Tap Targets:** Minimum 44px on all interactive elements.

---

## 7. Appointment Flow
1. Patient enters name, phone number, preferred date, time slot, service, and optional notes.
2. Form validates required fields and checks Bangladeshi mobile regex (`^(?:\+88|88)?(01[3-9]\d{8})$`).
3. On submission:
   - Formatted WhatsApp message is generated with all booking details.
   - User is redirected to `https://wa.me/<clinicNumber>?text=<encodedMessage>`.
   - Reassuring confirmation modal appears with a "Call Instead" option.
4. Future upgrade: Replace or append to `handleSubmit` in `src/components/AppointmentForm.jsx` with a `fetch('/api/appointments', ...)` call.

---

## 8. Deployment Guidelines
- **Vercel:** Ready out of the box with `vercel.json` SPA rewrite rules.
- **Netlify:** Ready out of the box with `netlify.toml` and `public/_redirects`.
- Build command: `npm run build`
- Output directory: `dist`
