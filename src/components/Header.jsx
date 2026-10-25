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

  const navLinks = [
    { name: t('nav.services'), href: '/#services' },
    { name: t('nav.whyUs'), href: '/#why-us' },
    { name: t('nav.doctors'), href: '/#doctors' },
    { name: t('nav.gallery'), href: '/#gallery' },
    { name: t('nav.reviews'), href: '/#reviews' },
    { name: t('nav.faq'), href: '/#faq' },
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
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-subtle py-3'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3.5'
        }`}
      >
        {/* Vertical Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-teal-400 via-cyan-500 to-brand-600 transition-all duration-100 ease-out pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            
            {/* Minimalist Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-slate-900 rounded-lg group"
              aria-label="Abrar Active Dental Homepage"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center transition-transform group-hover:scale-105">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 4 2 7 3 11 0.5 2 1.5 3 3 3s2.5-1 3-3c1-4 3-7 3-11 0-3.5-2.5-6-6-6z" />
                </svg>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-[15px] font-bold tracking-tight text-slate-900">
                  {isBn ? clinicData.nameBn : 'Abrar Active'}
                </span>
                {!isBn && (
                  <span className="text-[15px] font-light tracking-tight text-slate-400 hidden sm:inline">
                    Dental
                  </span>
                )}
              </div>
            </Link>

            {/* Desktop Minimalist Nav Links */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[13px] font-medium text-slate-600 hover:text-slate-950 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 rounded-md py-1"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Minimal Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              
              {/* Minimal Language Toggle Pill */}
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={`Switch language to ${language === 'en' ? 'Bangla' : 'English'}`}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <span className={language === 'en' ? 'text-slate-900 font-bold' : 'text-slate-400'}>EN</span>
                <span className="text-slate-300">/</span>
                <span className={language === 'bn' ? 'text-slate-900 font-bold' : 'text-slate-400'}>বাং</span>
              </button>

              {/* Minimal Phone Link (Desktop) */}
              <a
                href={`tel:${clinicData.phoneRaw}`}
                className="hidden xl:flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded-md transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{clinicData.phone}</span>
              </a>

              {/* Dental Primary CTA */}
              <Link
                to="/#appointment"
                onClick={(e) => handleNavClick(e, '/#appointment')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-brand-600/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>{t('nav.bookAppointment')}</span>
              </Link>

              {/* Minimal Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-900" />
                ) : (
                  <div className="w-4 h-3 flex flex-col justify-between">
                    <span className="w-full h-0.5 bg-slate-800 rounded-full" />
                    <span className="w-full h-0.5 bg-slate-800 rounded-full" />
                  </div>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Minimal Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-base">
                  {isBn ? clinicData.nameBn : clinicData.name}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status capsule */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${openStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div className="text-xs">
                  <p className="font-medium text-slate-800">
                    {isBn ? openStatus.labelBn : openStatus.labelEn}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {isBn ? openStatus.detailBn : openStatus.detailEn}
                  </p>
                </div>
              </div>

              {/* Nav links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom actions */}
            <div className="pt-6 border-t border-slate-100 space-y-2.5">
              <Link
                to="/#appointment"
                onClick={(e) => handleNavClick(e, '/#appointment')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>{t('nav.bookAppointment')}</span>
              </Link>

              <a
                href={`tel:${clinicData.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{clinicData.phone}</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
