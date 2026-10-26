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
    <section id="faq" className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#8DD0F5]/12 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#072444] bg-[#8DD0F5]/30 px-3.5 py-1 rounded-full border border-[#78C4EF]/60 shadow-sm inline-block mb-3">
            {t('faq.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072444] tracking-tight mb-3">
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
                    ? 'border-[#4A9BDA] bg-[#8DD0F5]/18 shadow-[0_4px_20px_rgba(74,155,218,0.12)] -translate-y-0.5'
                    : 'border-[#8DD0F5]/40 bg-white/95 hover:border-[#4A9BDA] hover:shadow-[0_4px_16px_rgba(74,155,218,0.08)] hover:-translate-y-0.5'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 sm:px-7 flex items-center justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-[#4A9BDA] rounded-3xl min-h-[58px]"
                >
                  <span className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? 'text-[#072444]' : 'text-[#072444] hover:text-[#4A9BDA]'
                  }`}>
                    {question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#4A9BDA] text-white' : 'bg-[#8DD0F5]/25 text-[#072444]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#8DD0F5]/30">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* See More / Show Less Button */}
        {faqsData.length > 3 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-[#072444] bg-[#8DD0F5]/25 hover:bg-[#8DD0F5]/40 active:scale-95 border border-[#78C4EF]/60 rounded-full shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#4A9BDA] min-h-[44px]"
            >
              <span>{showAll ? t('faq.seeLess') : `${t('faq.seeMore')} (${faqsData.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Direct Ask CTA Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#8DD0F5]/25 via-sky-50 to-[#78C4EF]/20 border border-[#8DD0F5]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#072444]">
              {t('faq.stillHaveQuestions')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t('faq.whatsappHelp')}
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('hero.ctaWhatsapp')}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
