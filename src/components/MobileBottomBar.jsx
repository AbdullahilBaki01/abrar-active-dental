import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function MobileBottomBar() {
  const { t, language } = useLanguage();
  const whatsappUrl = generateGeneralWhatsAppUrl(language);

  const handleBookClick = (e) => {
    const appointmentEl = document.getElementById('appointment');
    if (appointmentEl) {
      e.preventDefault();
      appointmentEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Quick Mobile Actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-floating px-3 py-2 pb-safe"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Now */}
        <a
          href={`tel:${clinicData.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 text-slate-700 hover:text-brand-600 active:scale-95 transition-transform min-h-[48px] rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Call clinic directly"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-1 text-brand-700">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-semibold leading-none">{t('mobileBar.call')}</span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 text-emerald-700 hover:text-emerald-800 active:scale-95 transition-transform min-h-[48px] rounded-xl hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Chat on WhatsApp"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mb-1 text-emerald-600">
            <MessageCircle className="w-4 h-4 fill-emerald-600/20" />
          </div>
          <span className="text-[11px] font-semibold leading-none">{t('mobileBar.whatsapp')}</span>
        </a>

        {/* Book Appointment */}
        <Link
          to="/#appointment"
          onClick={handleBookClick}
          className="flex flex-col items-center justify-center py-2 px-1 text-brand-700 hover:text-brand-800 active:scale-95 transition-transform min-h-[48px] rounded-xl bg-brand-50 hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Jump to appointment booking form"
        >
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center mb-1 text-white shadow-sm">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold leading-none text-brand-800">{t('mobileBar.book')}</span>
        </Link>
      </div>
    </nav>
  );
}
