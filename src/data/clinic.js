/**
 * CLINIC CONFIGURATION FILE
 * All clinic contact details, hours, locations, and social links live here.
 */

export const clinicData = {
  // Clinic Branding
  name: "Abrar Active Dental",
  nameBn: "আবরার একটিভ ডেন্টাল",
  shortName: "Abrar Dental",
  shortNameBn: "আবরার ডেন্টাল",
  tagline: "Modern, Hygienic & Caring Dental Care",
  taglineBn: "আধুনিক, স্বাস্থ্যসম্মত ও নির্ভরযোগ্য ডেন্টাল সেবা",
  siteUrl: "https://abraractivedental.com",

  // Contact Numbers
  phone: "+880 1718-768931",
  phoneRaw: "+8801718768931", // Clean number for tel: links
  whatsapp: "+8801718768931", // Clean number for wa.me links
  emergencyPhone: "+880 1718-768931",

  // Email (public listing)
  email: "dr.arifa1bds@gmail.com",

  // Physical Location
  address: {
    line1: "House #75, Block #E, Road #2, Kalshi Road",
    line1Bn: "বাড়ি #৭৫, ব্লক #ই, রোড #২, কালশী রোড",
    area: "Kalshi, Mirpur",
    areaBn: "কালশী, মিরপুর",
    city: "Dhaka",
    cityBn: "ঢাকা",
    postalCode: "1216",
    country: "Bangladesh",
    countryBn: "বাংলাদেশ",
    fullAddress: "House #75, Block #E, Road #2, 1216 Kalshi Rd, Dhaka 1216",
    fullAddressBn: "বাড়ি #৭৫, ব্লক #ই, রোড #২, ১২১৬ কালশী রোড, ঢাকা ১২১৬",
    landmarks: "1216 Kalshi Road, Block E",
    landmarksBn: "১২১৬ কালশী রোড, ব্লক ই",
  },

  // Socials & Maps
  facebookUrl: "https://www.facebook.com/abraractivedentalbd",
  googleMapsUrl: "https://maps.app.goo.gl/ZLPLNZRx3j74CauK6",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=House%2375%2C%20Block%23E%2C%20Road%232%2C%201216%20Kalshi%20Rd%2C%20Dhaka%201216&t=&z=16&ie=UTF8&iwloc=&output=embed",

  // Geo coordinates for LocalBusiness Schema (Kalshi / Mirpur, Dhaka 1216)
  geo: {
    latitude: 23.822938,
    longitude: 90.37591,
  },

  // Opening Hours Configuration
  // Used by useOpenNow hook to calculate real-time "Open Now" / "Closed" status
  // Day numbers: 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  schedule: [
    { day: 6, dayName: "Saturday", dayNameBn: "শনিবার", open: "17:00", close: "22:00", isOpen: true },
    { day: 0, dayName: "Sunday", dayNameBn: "রবিবার", open: "17:00", close: "22:00", isOpen: true },
    { day: 1, dayName: "Monday", dayNameBn: "সোমবার", open: "17:00", close: "22:00", isOpen: true },
    { day: 2, dayName: "Tuesday", dayNameBn: "মঙ্গলবার", open: "17:00", close: "22:00", isOpen: true },
    { day: 3, dayName: "Wednesday", dayNameBn: "বুধবার", open: "17:00", close: "22:00", isOpen: true },
    { day: 4, dayName: "Thursday", dayNameBn: "বৃহস্পতিবার", open: "17:00", close: "22:00", isOpen: true },
    { day: 5, dayName: "Friday", dayNameBn: "শুক্রবার", open: "16:00", close: "21:00", isOpen: true },
  ],

  // Formatted display hours
  displayHours: {
    satThu: "Saturday – Thursday: 5:00 PM – 10:00 PM",
    satThuBn: "শনিবার – বৃহস্পতিবার: বিকাল ৫:০০ – রাত ১০:০০",
    friday: "Friday: 4:00 PM – 9:00 PM",
    fridayBn: "শুক্রবার: বিকাল ৪:০০ – রাত ৯:০০",
    note: "Consultation by prior appointment is recommended to avoid waiting.",
    noteBn: "অযথা অপেক্ষা এড়াতে আগে থেকে অ্যাপয়েন্টমেন্ট নেওয়া উত্তম।",
  },

  // Trust highlights (Only confirmed, neutral medical facts - no invented awards or numbers)
  trustHighlights: [
    {
      id: "sterilization",
      title: "100% Autoclaved & Sterilized",
      titleBn: "১০০% জীবাণুমুক্ত যন্ত্রপাতি",
      desc: "Hospital-grade autoclaves & sealed instruments for zero cross-infection.",
      descBn: "প্রতিটি রোগীর জন্য অটোক্লেভ ও সিলযুক্ত জীবাণুমুক্ত নিরাপদ যন্ত্রপাতি।",
      icon: "ShieldCheck",
    },
    {
      id: "registered_doctors",
      title: "BMDC Registered Dentists",
      titleBn: "বিএমডিসি নিবন্ধিত ডাক্তার",
      desc: "Qualified dental surgeons with recognized degrees and ethical practice.",
      descBn: "স্বীকৃত ডিগ্রিপ্রাপ্ত এবং বিএমডিসি নিবন্ধিত অভিজ্ঞ ডেন্টাল সার্জন।",
      icon: "Award",
    },
    {
      id: "modern_tech",
      title: "Modern Equipment & Low-Dose X-Ray",
      titleBn: "আধুনিক ডিজিটাল সরঞ্জাম ও এক্স-রে",
      desc: "High precision dental operatory chair and digital diagnostic imaging.",
      descBn: "সঠিক ডায়াগনোসিসের জন্য আধুনিক ডেন্টাল চেয়ার এবং ডিজিটাল এক্স-রে।",
      icon: "Sparkles",
    },
    {
      id: "pain_free",
      title: "Gentle & Pain-Managed Care",
      titleBn: "ভীতিহীন ও ব্যথামুক্ত চিকিৎসা",
      desc: "Patient-centered gentle approach designed for anxiety-free visits.",
      descBn: "শান্ত ও আরামদায়ক পরিবেশে ব্যথামুক্ত দাঁতের চিকিৎসার যত্ন।",
      icon: "HeartHandshake",
    },
  ],
};
