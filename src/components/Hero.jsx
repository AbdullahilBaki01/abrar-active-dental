import React from 'react';
import { Calendar, Phone, MessageCircle, ArrowUpRight, ShieldCheck, Award, Sparkles, HeartHandshake, CheckCircle2, MapPin } from 'lucide-react';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';
import { useOpenNow } from '../hooks/useOpenNow';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';
import { getAssetUrl } from '../utils/assets';

export default function Hero() {
  const { t, isBn, language } = useLanguage();
  const openStatus = useOpenNow();
  const whatsappUrl = generateGeneralWhatsAppUrl(language);

  const handleBookClick = (e) => {
    e.preventDefault();
    const appointmentEl = document.getElementById('appointment');
    if (appointmentEl) {
      appointmentEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative flex flex-col justify-between overflow-hidden bg-slate-950 text-white min-h-[auto] lg:min-h-[92vh] lg:justify-center">
      {/* High-Definition Authentic Clinic Operatory Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={getAssetUrl('/images/hero-cover.jpg')}
          alt="Abrar Active Dental Modern Operatory Clinic Suite at Kalshi, Mirpur"
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[72%_center] sm:object-center brightness-[0.55] contrast-[1.10] scale-100"
        />
      </div>

      {/* Balanced Artistic Dark Gradient Overlays for High Legibility */}
      <div className="absolute inset-0 z-10 bg-slate-950/70" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/85" />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(2, 6, 23, 0.45) 0%, rgba(2, 6, 23, 0.85) 80%)'
        }}
      />

      {/* Atmospheric Glowing Accent Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 sm:w-[32rem] sm:h-[32rem] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Foreground Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-10 w-full flex flex-col justify-between min-h-[auto] lg:min-h-[88vh]">
        
        {/* Main Hero Content Information (Center Aligned) */}
        <div className="max-w-4xl mx-auto text-center my-auto pt-2 sm:pt-4 flex flex-col items-center">
          
          {/* Top Pill Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            {/* Live Open/Closed Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white shadow-lg transition-all">
              <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${openStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span className={`relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 ${openStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </span>
              <span className="font-semibold text-white tracking-wide">
                {isBn ? openStatus.labelBn : openStatus.labelEn}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-slate-300 font-normal text-[11px] sm:text-xs">
                {isBn ? openStatus.detailBn : openStatus.detailEn}
              </span>
            </div>

            {/* Location / Area Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-950/60 text-cyan-200 border border-cyan-500/30 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{isBn ? 'কালশী, মিরপুর ১২' : 'Kalshi, Mirpur-12'}</span>
            </div>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-black tracking-tight text-white leading-[1.15] sm:leading-[1.12] mb-4 sm:mb-5 drop-shadow-md text-center max-w-3xl">
            <span className="block">{t('hero.titlePrefix')}</span>
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-300 to-sky-200 font-display">
              {t('hero.titleHighlight')}
            </span>
          </h1>

          {/* Reassuring Subtext */}
          <p className="text-xs min-[380px]:text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed mb-5 sm:mb-6 max-w-2xl mx-auto font-normal drop-shadow text-center">
            {t('hero.subtext')}
          </p>

          {/* Key Clinical Trust Micro-Points */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-2.5 mb-6 sm:mb-8 text-xs sm:text-sm text-slate-300">
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 shrink-0" />
              <span>{t('hero.bullet1')}</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>{t('hero.bullet2')}</span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
              <span>{t('hero.bullet3')}</span>
            </div>
          </div>

          {/* Action Buttons Group (Centered) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-4 w-full sm:w-auto">
            {/* Primary Appointment Button */}
            <a
              href="#appointment"
              onClick={handleBookClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-brand-600 via-dental-500 to-brand-600 hover:from-brand-500 hover:to-dental-400 rounded-2xl shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px] border border-cyan-400/40 group"
            >
              <Calendar className="w-5 h-5 text-cyan-200 group-hover:scale-110 transition-transform" />
              <span>{t('hero.ctaBook')}</span>
            </a>

            {/* Mobile 2-col Secondary Buttons Row */}
            <div className="grid grid-cols-2 sm:flex sm:items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              {/* Secondary Call Clinic Button */}
              <a
                href={`tel:${clinicData.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm md:text-base font-bold text-white hover:text-cyan-200 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 hover:border-white/40 rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-cyan-300 shrink-0" />
                <span className="truncate">{t('hero.ctaCall')}</span>
              </a>

              {/* WhatsApp Quick Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:px-5 sm:py-4 rounded-2xl text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900/80 backdrop-blur-xl border border-emerald-500/40 hover:border-emerald-400 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </a>
            </div>
          </div>

        </div>

        {/* Artistic Trust Glassmorphism Cards Bar */}
        <div className="w-full pt-6 sm:pt-8 pb-2 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            
            {/* Card 1: Sterilization */}
            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/15 transition-all shadow-lg hover:-translate-y-0.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-400/20 border border-teal-300/30 flex items-center justify-center text-teal-300 shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-white truncate">{t('hero.trustChip1')}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">{isBn ? 'আন্তর্জাতিক অটোক্লেভ' : 'Hospital Grade'}</p>
              </div>
            </div>

            {/* Card 2: BMDC Registered */}
            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/15 transition-all shadow-lg hover:-translate-y-0.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-400/20 border border-cyan-300/30 flex items-center justify-center text-cyan-300 shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-white truncate">{t('hero.trustChip2')}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">{isBn ? 'বিএমডিসি স্বীকৃত সার্জন' : 'Certified Surgeons'}</p>
              </div>
            </div>

            {/* Card 3: Modern Equipment */}
            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/15 transition-all shadow-lg hover:-translate-y-0.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-400/20 border border-sky-300/30 flex items-center justify-center text-sky-300 shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-white truncate">{t('hero.trustChip3')}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">{isBn ? 'ডিজিটাল ডেন্টাল সরঞ্জাম' : 'Modern Suite'}</p>
              </div>
            </div>

            {/* Card 4: Gentle Care */}
            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/15 transition-all shadow-lg hover:-translate-y-0.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-400/20 border border-rose-300/30 flex items-center justify-center text-rose-300 shrink-0">
                <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-white truncate">{t('hero.trustChip4')}</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">{isBn ? 'ব্যথাহীন ও কোমল যত্ন' : 'Gentle Care'}</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Vertical Scroll Down Indicator (Desktop) */}
      <button
        type="button"
        onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label={isBn ? 'নিচে স্ক্রোল করুন' : 'Scroll down to explore'}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors group focus:outline-none"
      >
        <div className="w-5 h-7 rounded-full border-2 border-white/30 flex items-start justify-center p-1 group-hover:border-white/60 transition-colors">
          <div className="w-1 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </button>

      {/* Smooth Blend to the Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900/60 to-transparent z-10 pointer-events-none" />
    </section>
  );
}

