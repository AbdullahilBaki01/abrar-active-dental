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
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-100 inline-block mb-3">
            {t('services.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight mb-3">
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
                className="group relative bg-white rounded-3xl p-7 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-400 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Dental cyan hover top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-dental-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon & Duration Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-brand-500/25 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Clock className="w-3 h-3 text-brand-500" />
                      <span>{service.duration}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-600 transition-colors mb-2.5">
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
                    className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 active:scale-95 rounded-xl shadow-sm hover:shadow-md hover:shadow-brand-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[38px]"
                  >
                    {t('services.bookThis')}
                  </button>

                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-800 transition-colors py-1 px-2 group/link"
                    title={`Read more about ${title}`}
                  >
                    <span>{t('services.learnMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
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
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 active:scale-95 border border-brand-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[44px]"
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
