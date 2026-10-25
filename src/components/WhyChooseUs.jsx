import React, { useState } from 'react';
import { ShieldCheck, Award, Scan, HeartHandshake, Eye, Clock, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function WhyChooseUs() {
  const { t, isBn } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const points = [
    {
      icon: ShieldCheck,
      title: t('whyUs.point1Title'),
      desc: t('whyUs.point1Desc'),
      highlight: isBn ? '১০০% অটোক্লেভ' : '100% Autoclaved',
    },
    {
      icon: Award,
      title: t('whyUs.point2Title'),
      desc: t('whyUs.point2Desc'),
      highlight: isBn ? 'বিএমডিসি রেজিস্টার্ড' : 'BMDC Registered',
    },
    {
      icon: Scan,
      title: t('whyUs.point3Title'),
      desc: t('whyUs.point3Desc'),
      highlight: isBn ? 'ডিজিটাল এক্স-রে' : 'Digital X-Ray',
    },
    {
      icon: HeartHandshake,
      title: t('whyUs.point4Title'),
      desc: t('whyUs.point4Desc'),
      highlight: isBn ? 'ব্যথাহীন ও কোমল' : 'Gentle Care',
    },
    {
      icon: Eye,
      title: t('whyUs.point5Title'),
      desc: t('whyUs.point5Desc'),
      highlight: isBn ? 'ন্যায্য ও সৎ' : 'Honest Pricing',
    },
    {
      icon: Clock,
      title: isBn ? 'নির্ধারিত সময়ে সেবা' : 'Punctual & Dedicated Time',
      desc: isBn
        ? 'অ্যাপয়েন্টমেন্ট অনুযায়ী সময় মতো ডাক্তার কনসালটেশন যাতে অযথা দীর্ঘ অপেক্ষা করতে না হয়।'
        : 'Scheduled consultation slots designed to respect your time with minimal clinic waiting.',
      highlight: isBn ? 'অন-টাইম কনসালটেশন' : 'Minimal Waiting',
    },
  ];

  const displayedPoints = showAll ? points : points.slice(0, 3);

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-slate-50/60 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-100 inline-block mb-3">
            {t('whyUs.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight mb-3">
            {t('whyUs.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t('whyUs.desc')}
          </p>
        </div>

        {/* 3 Boxes Grid (Expandable to All) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-7 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-400 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Dental cyan hover top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-dental-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-brand-500/25 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold text-brand-700 bg-brand-50/80 px-2.5 py-1 rounded-full border border-brand-100/60">
                      {point.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 group-hover:text-brand-600 transition-colors mb-2.5">
                    {point.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {point.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More / Show Less Button */}
        {points.length > 3 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-brand-700 bg-white hover:bg-brand-50 active:scale-95 border border-brand-200 rounded-2xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[44px]"
            >
              <span>{showAll ? t('whyUs.seeLess') : `${t('whyUs.seeMore')} (${points.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
