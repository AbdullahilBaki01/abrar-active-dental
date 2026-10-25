import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Phone, MapPin, Clock, Heart, Shield } from 'lucide-react';
import { clinicData } from '../data/clinic';
import { servicesData } from '../data/services';
import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
  const { t, isBn } = useLanguage();

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 4 2 7 3 11 0.5 2 1.5 3 3 3s2.5-1 3-3c1-4 3-7 3-11 0-3.5-2.5-6-6-6z" fill="white" fillOpacity="0.2"/>
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 4 2 7 3 11 0.5 2 1.5 3 3 3s2.5-1 3-3c1-4 3-7 3-11 0-3.5-2.5-6-6-6z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-white block">
                  {isBn ? clinicData.nameBn : clinicData.name}
                </span>
                <span className="text-xs text-brand-400">
                  {isBn ? clinicData.taglineBn : clinicData.tagline}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              {t('footer.about')}
            </p>

            <div className="flex items-center gap-3">
              <a
                href={clinicData.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`tel:${clinicData.phoneRaw}`}
                aria-label="Call clinic"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/#hero" className="hover:text-brand-400 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-brand-400 transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/#why-us" className="hover:text-brand-400 transition-colors">
                  {t('nav.whyUs')}
                </Link>
              </li>
              <li>
                <Link to="/#doctors" className="hover:text-brand-400 transition-colors">
                  {t('nav.doctors')}
                </Link>
              </li>
              <li>
                <Link to="/#gallery" className="hover:text-brand-400 transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/#reviews" className="hover:text-brand-400 transition-colors">
                  {t('nav.reviews')}
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="hover:text-brand-400 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer.servicesTitle')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {servicesData.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="hover:text-brand-400 transition-colors line-clamp-1"
                  >
                    {isBn ? s.titleBn : s.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer.contactTitle')}
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>{isBn ? clinicData.address.fullAddressBn : clinicData.address.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href={`tel:${clinicData.phoneRaw}`} className="hover:text-brand-400 font-semibold">
                  {clinicData.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Sat–Thu: 5:00 PM – 10:00 PM</p>
                  <p>Friday: 4:00 PM – 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} {clinicData.name}. {t('footer.rights')}
          </p>

          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-brand-400 transition-colors">
              {t('footer.privacy')}
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/#appointment" className="hover:text-brand-400 transition-colors">
              {t('nav.bookAppointment')}
            </Link>
          </div>
        </div>

        {/* Medical disclaimer note */}
        <div className="mt-6 pt-4 border-t border-slate-900 text-[11px] text-slate-400 leading-relaxed text-center">
          {t('footer.disclaimer')}
        </div>

      </div>
    </footer>
  );
}
