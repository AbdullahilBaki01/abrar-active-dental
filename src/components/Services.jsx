import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldAlert,
  Activity,
  Scissors,
  Smile,
  Layers,
  HeartHandshake,
  Zap,
  Heart,
  Anchor,
  Scan,
  ArrowRight,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { servicesData } from '../data/services';
import { useLanguage } from '../i18n/LanguageContext';

const iconMap = {
  Sparkles,
  ShieldAlert,
  Activity,
  Scissors,
  Smile,
  Layers,
  HeartHandshake,
  Zap,
  Heart,
  Anchor,
  Scan,
};

export default function Services({ onSelectService }) {
  const { t, isBn } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const handleBookService = (serviceId) => {
    if (onSelectService) {
      onSelectService(serviceId);
    }
    const appointmentEl = document.getElementById('appointment');
    if (appointmentEl) {
      appointmentEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayedServices = showAll ? servicesData : servicesData.slice(0, 3);

  return (
    <section id="services" className="py-16 sm:py-24 bg-gradient-to-b from-white via-[#8DD0F5]/15 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#072444] bg-[#8DD0F5]/30 px-3.5 py-1 rounded-full border border-[#78C4EF]/60 shadow-sm inline-block mb-3">
            {t('services.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072444] tracking-tight mb-3">
            {t('services.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t('services.desc')}
          </p>
        </div>

        {/* 3 Boxes Grid (Expandable to All) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedServices.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const title = isBn ? service.titleBn : service.titleEn;
            const desc = isBn ? service.shortDescBn : service.shortDescEn;

            return (
              <div
                key={service.id}
                className="group relative bg-white/95 rounded-3xl p-7 border border-[#8DD0F5]/45 shadow-[0_4px_20px_rgba(74,155,218,0.06)] hover:shadow-[0_16px_32px_rgba(74,155,218,0.18)] hover:border-[#4A9BDA] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Hero sky/light-sky/soft-aqua hover top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4A9BDA] via-[#78C4EF] to-[#8DD0F5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon & Duration Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8DD0F5]/25 to-[#78C4EF]/15 border border-[#8DD0F5]/50 flex items-center justify-center text-[#072444] group-hover:scale-110 group-hover:bg-[#4A9BDA] group-hover:text-white group-hover:border-[#4A9BDA] group-hover:shadow-md group-hover:shadow-[#4A9BDA]/30 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#072444] bg-[#8DD0F5]/20 px-2.5 py-1 rounded-lg border border-[#78C4EF]/40">
                      <Clock className="w-3 h-3 text-[#4A9BDA]" />
                      <span>{service.duration}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#072444] group-hover:text-[#4A9BDA] transition-colors mb-2.5">
                    {title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                    {desc}
                  </p>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookService(service.id)}
                    className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#072444] to-[#0c3966] hover:from-[#4A9BDA] hover:to-[#072444] active:scale-95 rounded-full shadow-sm hover:shadow-md hover:shadow-[#4A9BDA]/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#4A9BDA] min-h-[38px]"
                  >
                    {t('services.bookThis')}
                  </button>

                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#072444] hover:text-[#4A9BDA] transition-colors py-1 px-2 group/link"
                    title={`Read more about ${title}`}
                  >
                    <span>{t('services.learnMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform text-[#4A9BDA]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More / Show Less Button */}
        {servicesData.length > 3 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-[#072444] bg-[#8DD0F5]/25 hover:bg-[#8DD0F5]/40 active:scale-95 border border-[#78C4EF]/60 rounded-full shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#4A9BDA] min-h-[44px]"
            >
              <span>{showAll ? t('services.seeLess') : `${t('services.seeMore')} (${servicesData.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
