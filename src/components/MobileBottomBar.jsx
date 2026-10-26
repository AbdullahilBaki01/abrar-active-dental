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
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-sky-100 shadow-[0_-4px_20px_rgba(7,36,68,0.06)] px-3 py-2 pb-safe"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Now */}
        <a
          href={`tel:${clinicData.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-1 text-slate-700 hover:text-[#072444] active:scale-95 transition-transform min-h-[48px] rounded-xl hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Call clinic directly"
        >
          <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center mb-1 text-[#072444] border border-sky-100">
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
          className="flex flex-col items-center justify-center py-2 px-1 text-[#072444] hover:text-[#0c3966] active:scale-95 transition-transform min-h-[48px] rounded-xl bg-sky-50/70 hover:bg-sky-100/80 focus:outline-none focus:ring-2 focus:ring-sky-400 border border-sky-100"
          aria-label="Jump to appointment booking form"
        >
          <div className="w-8 h-8 rounded-full bg-[#072444] flex items-center justify-center mb-1 text-white shadow-sm shadow-[#072444]/20">
            <Calendar className="w-4 h-4 text-cyan-200" />
          </div>
          <span className="text-[11px] font-bold leading-none text-[#072444]">{t('mobileBar.book')}</span>
        </Link>
      </div>
    </nav>
  );
}
