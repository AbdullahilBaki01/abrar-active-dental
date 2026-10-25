const fs = require('fs');
const path = require('path');

const galleryItems = [
  {
    file: 'gallery-1.svg',
    title: 'Modern Dental Operatory',
    subtitle: 'Ergonomic patient comfort chair & LED surgical light',
    accent: '#0d9488',
    icon: `<path d="M140 260 L 260 260 L 240 320 L 160 320 Z" fill="#0d9488"/><circle cx="200" cy="180" r="30" fill="#2dd4bf"/>`
  },
  {
    file: 'gallery-2.svg',
    title: 'Autoclave Sterilization Unit',
    subtitle: '100% sterile sealed instruments for every patient',
    accent: '#0284c7',
    icon: `<rect x="150" y="150" width="100" height="100" rx="16" fill="#0284c7"/><circle cx="200" cy="200" r="24" fill="#bae6fd"/>`
  },
  {
    file: 'gallery-3.svg',
    title: 'Digital Dental X-Ray & Imaging',
    subtitle: 'Ultra-low radiation high precision diagnostics',
    accent: '#6366f1',
    icon: `<rect x="140" y="140" width="120" height="120" rx="12" fill="#312e81"/><path d="M180 180 Q200 160 220 180 Q220 220 200 240 Q180 220 180 180 Z" fill="#a5b4fc"/>`
  },
  {
    file: 'gallery-4.svg',
    title: 'Smile Whitening & Cosmetics',
    subtitle: 'Safe, instant shade enhancement treatments',
    accent: '#f59e0b',
    icon: `<circle cx="200" cy="200" r="45" fill="#fef3c7"/><path d="M180 200 Q200 230 220 200" stroke="#d97706" stroke-width="6" fill="none" stroke-linecap="round"/>`
  },
  {
    file: 'gallery-5.svg',
    title: 'Pediatric Care & Kids Corner',
    subtitle: 'Gentle, friendly and fear-free dental visits',
    accent: '#ec4899',
    icon: `<circle cx="200" cy="190" r="40" fill="#fbcfe8"/><circle cx="185" cy="180" r="5" fill="#be185d"/><circle cx="215" cy="180" r="5" fill="#be185d"/><path d="M185 205 Q200 220 215 205" stroke="#be185d" stroke-width="4" fill="none"/>`
  },
  {
    file: 'gallery-6.svg',
    title: 'Crowns, Bridges & Implants',
    subtitle: 'Long-lasting natural tooth restoration',
    accent: '#10b981',
    icon: `<path d="M170 170 Q200 140 230 170 L220 230 Q200 240 180 230 Z" fill="#10b981"/><path d="M185 190 L215 190" stroke="#ffffff" stroke-width="4"/>`
  }
];

const imgDir = path.resolve('f:/abrar/public/images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

galleryItems.forEach(item => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_${item.file}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" rx="16" fill="url(#bg_${item.file})"/>
  <rect x="20" y="20" width="560" height="410" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  
  <g transform="translate(100, 10)">
    ${item.icon}
  </g>
  
  <text x="300" y="320" font-family="Poppins, sans-serif" font-size="20" font-weight="700" fill="#0f172a" text-anchor="middle">${item.title}</text>
  <text x="300" y="350" font-family="Poppins, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">${item.subtitle}</text>
  
  <rect x="230" y="380" width="140" height="28" rx="14" fill="#f0fdfa" stroke="#0d9488" stroke-width="1.5"/>
  <text x="300" y="399" font-family="Poppins, sans-serif" font-size="11" font-weight="600" fill="#0d9488" text-anchor="middle">Abrar Active Dental</text>
</svg>`;
  fs.writeFileSync(path.join(imgDir, item.file), svg);
});

// Generate og-image.svg
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="ogbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#134e4a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogbg)"/>
  
  <rect x="80" y="80" width="1040" height="470" rx="24" fill="#ffffff" fill-opacity="0.04" stroke="#2dd4bf" stroke-opacity="0.3" stroke-width="2"/>
  
  <circle cx="200" cy="220" r="60" fill="#0d9488"/>
  <path d="M185 190C185 178 197 175 200 180C203 175 215 178 215 190C215 208 217 220 210 240C206 250 199 249 195 235C193 230 191 230 190 235C186 249 179 250 175 240C168 220 185 208 185 190Z" fill="white"/>
  
  <text x="290" y="210" font-family="Poppins, sans-serif" font-size="44" font-weight="800" fill="#ffffff">Abrar Active Dental</text>
  <text x="290" y="255" font-family="Hind Siliguri, sans-serif" font-size="28" font-weight="600" fill="#2dd4bf">আবরার একটিভ ডেন্টাল</text>
  
  <text x="120" y="340" font-family="Poppins, sans-serif" font-size="28" font-weight="500" fill="#e2e8f0">Modern, Hygienic &amp; Caring Dental Clinic in Bangladesh</text>
  <text x="120" y="380" font-family="Poppins, sans-serif" font-size="20" fill="#94a3b8">Dental Scaling • Root Canal • Braces • Teeth Whitening • Pediatric Dentistry</text>
  
  <rect x="120" y="420" width="220" height="50" rx="12" fill="#0d9488"/>
  <text x="230" y="452" font-family="Poppins, sans-serif" font-size="18" font-weight="700" fill="#ffffff" text-anchor="middle">Book Appointment</text>
  
  <rect x="360" y="420" width="180" height="50" rx="12" fill="none" stroke="#2dd4bf" stroke-width="2"/>
  <text x="450" y="452" font-family="Poppins, sans-serif" font-size="18" font-weight="600" fill="#2dd4bf" text-anchor="middle">Call / WhatsApp</text>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'og-image.svg'), ogSvg);
console.log('Gallery and OG images created successfully');
