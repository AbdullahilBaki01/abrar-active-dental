import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function FloatingActions() {
  const { language, isBn } = useLanguage();
  const whatsappUrl = generateGeneralWhatsAppUrl(language);

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-30 flex items-center group">
      {/* Help tooltip on hover (desktop) */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-white shadow-soft rounded-full border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {isBn ? 'হোয়াটসঅ্যাপে প্রশ্ন করুন' : 'Chat on WhatsApp'}
      </span>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with Abrar Active Dental"
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-floating hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white/10" />
      </a>
    </div>
  );
}
