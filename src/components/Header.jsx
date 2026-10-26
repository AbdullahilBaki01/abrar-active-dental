import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Calendar, ArrowRight, X } from 'lucide-react';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';
import { useOpenNow } from '../hooks/useOpenNow';

export default function Header() {
  const { t, language, toggleLanguage, isBn } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const openStatus = useOpenNow();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Minimal Navigation: Core Essential Links
  const navLinks = [
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.whyUs'), href: '/#why-us' },
    { name: t('nav.doctors'), href: '/#doctors' },
    { name: t('nav.reviews'), href: '/#reviews' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ========================================================= */}
      {/* LUMINOUS SKY GLASSMORPHISM NAVIGATION BAR */}
      {/* ========================================================= */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-gradient-to-r from-sky-100/85 via-white/80 to-cyan-100/85 backdrop-blur-2xl backdrop-saturate-180 border-b border-sky-200/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_10px_30px_rgba(14,165,233,0.1)] py-2 sm:py-2.5'
            : 'bg-gradient-to-r from-sky-400/25 via-cyan-400/20 to-sky-400/25 backdrop-blur-2xl backdrop-saturate-180 border-b border-sky-200/45 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_8px_32px_rgba(14,165,233,0.12)] py-2.5 sm:py-3'
        }`}
      >
        {/* Luminous Sky Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-cyan-300 via-sky-400 to-[#072444] transition-all duration-100 ease-out pointer-events-none shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 sm:h-11">
            
            {/* Minimalist Brand Logo with Sky Glass Ring */}
            <Link
              to="/"
              className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-full group"
              aria-label="Abrar Active Dental Homepage"
            >
              <div className="w-8 h-8 rounded-full bg-[#072444] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-md shadow-sky-950/20 border border-cyan-300/40 shrink-0">
                <svg className="w-4 h-4 text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 4 2 7 3 11 0.5 2 1.5 3 3 3s2.5-1 3-3c1-4 3-7 3-11 0-3.5-2.5-6-6-6z" />
                </svg>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-[15px] font-black tracking-tight text-[#072444] drop-shadow-sm">
                  {isBn ? clinicData.nameBn : 'Abrar Active'}
                </span>
                {!isBn && (
                  <span className="text-[14px] font-semibold tracking-tight text-sky-700 hidden sm:inline">
                    Dental
                  </span>
                )}
              </div>
            </Link>

            {/* Desktop Sky Glassmorphic Nav Capsule */}
            <nav
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-200/35 hover:bg-sky-200/50 backdrop-blur-xl border border-sky-100/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_16px_rgba(14,165,233,0.12)] transition-all duration-200"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs font-semibold text-slate-800 hover:text-[#072444] hover:bg-white/80 hover:shadow-[0_2px_8px_rgba(14,165,233,0.15)] px-3.5 py-1.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Sky Glassmorphic Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Sky Glassmorphic Language Toggle Pill */}
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={`Switch language to ${language === 'en' ? 'Bangla' : 'English'}`}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-sky-200/35 hover:bg-sky-200/55 backdrop-blur-xl rounded-full border border-sky-100/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_8px_rgba(14,165,233,0.1)] transition-all focus:outline-none focus:ring-2 focus:ring-sky-400 active:scale-95"
              >
                <span className={language === 'en' ? 'text-[#072444] font-bold' : 'text-slate-500'}>EN</span>
                <span className="text-sky-400 text-[10px]">/</span>
                <span className={language === 'bn' ? 'text-[#072444] font-bold' : 'text-slate-500'}>বাং</span>
              </button>

              {/* Sky Glassmorphic Primary CTA Pill */}
              <Link
                to="/#appointment"
                onClick={(e) => handleNavClick(e, '/#appointment')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#072444] to-[#0c3966] hover:from-[#0a315c] hover:to-[#0f4477] backdrop-blur-md rounded-full transition-all border border-cyan-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_22px_rgba(7,36,68,0.28)] hover:shadow-[0_10px_26px_rgba(14,165,233,0.35)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-200" />
                <span>{t('nav.bookAppointment')}</span>
              </Link>

              {/* Sky Glassmorphic Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 rounded-full text-slate-800 hover:text-[#072444] bg-sky-200/35 hover:bg-sky-200/55 backdrop-blur-md border border-sky-100/70 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-sky-300 min-w-[38px] min-h-[38px] flex items-center justify-center active:scale-95"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#072444]" />
                ) : (
                  <div className="w-4 h-3 flex flex-col justify-between">
                    <span className="w-full h-0.5 bg-[#072444] rounded-full" />
                    <span className="w-full h-0.5 bg-[#072444] rounded-full" />
                  </div>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Sky Glassmorphic Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop with Soft Cyan Blur */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Frosted Sky Glass Drawer Menu */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-gradient-to-b from-sky-50/95 via-white/90 to-cyan-50/95 backdrop-blur-2xl border-l border-sky-200/60 shadow-[0_8px_32px_rgba(14,165,233,0.18)] p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-sky-200/60">
                <span className="font-extrabold text-[#072444] text-base">
                  {isBn ? clinicData.nameBn : clinicData.name}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-600 hover:text-[#072444] bg-sky-100/70 hover:bg-sky-200/80 backdrop-blur-md rounded-full border border-sky-200/70 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status capsule */}
              <div className="mt-4 p-3 rounded-2xl bg-sky-100/50 backdrop-blur-md border border-sky-200/70 shadow-sm flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div className="text-xs">
                  <p className="font-bold text-[#072444]">
                    {isBn ? openStatus.labelBn : openStatus.labelEn}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {isBn ? openStatus.detailBn : openStatus.detailEn}
                  </p>
                </div>
              </div>

              {/* Nav links */}
              <nav className="mt-6 flex flex-col space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-4 py-3 text-sm font-semibold text-slate-700 hover:text-[#072444] hover:bg-white/80 hover:shadow-sm bg-sky-100/40 backdrop-blur-md border border-sky-200/60 rounded-xl transition-all flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom actions */}
            <div className="pt-6 border-t border-sky-200/60 space-y-2.5">
              <Link
                to="/#appointment"
                onClick={(e) => handleNavClick(e, '/#appointment')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#072444] to-[#0c3966] backdrop-blur-md rounded-full transition-all border border-cyan-400/35 shadow-md shadow-[#072444]/25"
              >
                <Calendar className="w-4 h-4 text-cyan-200" />
                <span>{t('nav.bookAppointment')}</span>
              </Link>

              <a
                href={`tel:${clinicData.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-sky-100/60 hover:bg-sky-100/90 backdrop-blur-md rounded-full border border-sky-200/70 shadow-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>{clinicData.phone}</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
