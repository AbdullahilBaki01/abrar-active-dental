import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function VerticalScrollNav() {
  const { isBn } = useLanguage();
  const location = useLocation();
  const [activeId, setActiveId] = useState('hero');

  const sections = [
    { id: 'hero', nameEn: 'Home', nameBn: 'শুরু' },
    { id: 'why-us', nameEn: 'Why Us', nameBn: 'কেন আমরা' },
    { id: 'services', nameEn: 'Services', nameBn: 'সেবাসমূহ' },
    { id: 'doctors', nameEn: 'Doctors', nameBn: 'ডাক্তার' },
    { id: 'gallery', nameEn: 'Gallery', nameBn: 'গ্যালারি' },
    { id: 'reviews', nameEn: 'Reviews', nameBn: 'রিভিউ' },
    { id: 'faq', nameEn: 'FAQ', nameBn: 'প্রশ্নাবলি' },
    { id: 'appointment', nameEn: 'Appointment', nameBn: 'অ্যাপয়েন্টমেন্ট' },
    { id: 'contact', nameEn: 'Contact', nameBn: 'যোগাযোগ' },
  ];

  useEffect(() => {
    if (location.pathname !== '/') return;

    const observerCallback = (entries) => {
      // Find the most visible section
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible && visible.target.id) {
        setActiveId(visible.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: [0, 0.25],
    });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  if (location.pathname !== '/') return null;

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label={isBn ? 'পৃষ্ঠা স্ক্রোল নেভিগেশন' : 'Page vertical scroll navigation'}
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3 p-2.5 rounded-full bg-[#072444]/80 hover:bg-[#072444]/95 backdrop-blur-xl border border-cyan-300/30 shadow-2xl transition-all duration-300"
    >
      {/* Decorative vertical connecting line */}
      <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[1px] bg-white/10 pointer-events-none -z-10" />

      {sections.map((section) => {
        const isActive = activeId === section.id;
        const label = isBn ? section.nameBn : section.nameEn;

        return (
          <button
            key={section.id}
            type="button"
            onClick={(e) => handleScrollTo(e, section.id)}
            aria-label={`Scroll to ${label}`}
            aria-current={isActive ? 'location' : undefined}
            className="group relative flex items-center justify-center p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {/* Tooltip on Hover */}
            <span className="absolute right-9 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#072444] text-white border border-cyan-400/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl drop-shadow">
              {label}
            </span>

            {/* Active Pill vs Inactive Dot */}
            <span
              className={`transition-all duration-300 ${
                isActive
                  ? 'h-5 w-2.5 rounded-full bg-gradient-to-b from-sky-300 via-cyan-400 to-[#38bdf8] shadow-md shadow-cyan-400/60'
                  : 'h-2 w-2 rounded-full bg-white/40 hover:bg-white/80 group-hover:scale-125'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
