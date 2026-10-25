import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { faqsData } from '../data/faqs';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function FAQ() {
  const { t, isBn, language } = useLanguage();
  const [openIds, setOpenIds] = useState(['first-visit']);
  const [showAll, setShowAll] = useState(false);
  const whatsappUrl = generateGeneralWhatsAppUrl(language);

  const toggleAccordion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const displayedFaqs = showAll ? faqsData : faqsData.slice(0, 3);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-100 inline-block mb-3">
            {t('faq.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight mb-3">
            {t('faq.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('faq.desc')}
          </p>
        </div>

        {/* 3 Accordion Boxes Initially (Expandable to All) */}
        <div className="space-y-4">
          {displayedFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            const question = isBn ? faq.questionBn : faq.questionEn;
            const answer = isBn ? faq.answerBn : faq.answerEn;

            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-brand-400 bg-brand-50/25 shadow-card-hover -translate-y-0.5'
                    : 'border-slate-200/80 bg-white hover:border-brand-300 hover:shadow-card hover:-translate-y-1'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 sm:px-7 flex items-center justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-3xl min-h-[58px]"
                >
                  <span className="text-sm sm:text-base font-bold text-navy-900 leading-snug">
                    {question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-brand-600 text-white rotate-180 shadow-sm shadow-brand-600/30'
                        : 'bg-slate-100 text-slate-500 hover:bg-brand-50 hover:text-brand-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-brand-100/60">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* See More / Show Less Button */}
        {faqsData.length > 3 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 active:scale-95 border border-brand-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[44px]"
            >
              <span>{showAll ? t('faq.seeLess') : `${t('faq.seeMore')} (${faqsData.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Help CTA Box */}
        <div className="mt-14 bg-gradient-to-b from-slate-50 to-brand-50/30 rounded-3xl p-7 sm:p-9 border border-slate-200/80 text-center shadow-soft">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-navy-900 mb-1">
            {t('faq.stillHaveQuestions')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-md mx-auto">
            {t('faq.talkToUs')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={`tel:${clinicData.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 active:scale-95 border border-slate-300 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>Call {clinicData.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
