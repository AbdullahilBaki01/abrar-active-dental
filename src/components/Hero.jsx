import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Phone,
  MessageCircle,
  ArrowUpRight,
  MapPin,
  ArrowDown,
  Check,
  Sparkles
} from 'lucide-react';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';
import { useOpenNow } from '../hooks/useOpenNow';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';
import { getAssetUrl } from '../utils/assets';

export default function Hero() {
  const { t, isBn, language } = useLanguage();
  const openStatus = useOpenNow();
  const whatsappUrl = generateGeneralWhatsAppUrl(language);
  const prefersReducedMotion = useReducedMotion();

  // 5 Rich Curated Dental Showcase Slides
  const heroSlides = [
    {
      id: 'tooth',
      image: '/images/hero-perfect-tooth.jpg',
      alt: 'Precision 3D CAD/CAM anatomical molar tooth model',
      isTooth: true,
      tag: isBn ? '৩ডি ডিজিটাল প্ল্যানিং' : '3D CAD/CAM RESTORATION',
      badge: isBn ? '৩ডি নিখুঁত স্মাইল কেয়ার' : '3D Restorative Precision',
      card1: {
        title: t('hero.minimalCard1Title'),
        desc: t('hero.minimalCard1Desc'),
      },
      card2: {
        title: t('hero.minimalCard2Title'),
        desc: t('hero.minimalCard2Desc'),
      },
    },
    {
      id: 'smile',
      image: '/images/hero-patient-smile.jpg',
      alt: 'Radiant healthy confident patient smile',
      isTooth: false,
      tag: isBn ? 'প্রাকৃতিক সুন্দর হাসি' : 'NATURAL CONFIDENT SMILE',
      badge: isBn ? 'বাস্তব রোগীর ফলাফল' : 'Verified Patient Smile',
      card1: {
        title: isBn ? 'উজ্জ্বল হাসি' : 'Radiant Smiles',
        desc: isBn ? 'প্রাকৃতিক সৌন্দর্য' : 'Natural Aesthetics',
      },
      card2: {
        title: isBn ? '১০০% সন্তুষ্টি' : '100% Verified',
        desc: isBn ? 'রোগীর পূর্ণ আস্থা' : 'Happy Patients',
      },
    },
    {
      id: 'checkup',
      image: '/images/hero-caring-checkup.jpg',
      alt: 'Gentle dentist consulting patient with digital X-ray',
      isTooth: false,
      tag: isBn ? 'ডিজিটাল ডায়াগনোসিস' : 'LOW-RADIATION DIGITAL X-RAY',
      badge: isBn ? 'ব্যথাহীন পরামর্শ' : 'Gentle Diagnosis',
      card1: {
        title: isBn ? 'ডিজিটাল এক্স-রে' : 'Digital X-Ray',
        desc: isBn ? 'কম রেডিয়েশন স্ক্যান' : 'Low-Radiation Scan',
      },
      card2: {
        title: isBn ? 'কোমল যত্ন' : 'Gentle Care',
        desc: isBn ? 'ব্যথাহীন পরামর্শ' : 'Patient-First Ethics',
      },
    },
    {
      id: 'dentist',
      image: '/images/hero-dentist-main.jpg',
      alt: 'Experienced dental surgeon in modern digital clinic',
      isTooth: false,
      tag: isBn ? 'বিএমডিসি স্বীকৃত সার্জন' : 'BMDC REGISTERED SURGEON',
      badge: isBn ? 'আধুনিক ক্লিনিক স্যুট' : 'Senior Dental Surgeon',
      card1: {
        title: isBn ? 'দক্ষ সার্জন' : 'Senior Surgeon',
        desc: isBn ? 'বিএমডিসি স্বীকৃত' : 'BMDC Registered',
      },
      card2: {
        title: isBn ? 'আধুনিক সরঞ্জাম' : 'Modern Suite',
        desc: isBn ? 'ডিজিটাল স্ক্যানার' : '3D Digital Scanner',
      },
    },
    {
      id: 'sterile',
      image: '/images/hero-sterile-tech.jpg',
      alt: 'Sterile autoclave sealed instruments in modern clinic operatory',
      isTooth: false,
      tag: isBn ? '১০০% জীবাণুমুক্ত' : 'HOSPITAL-GRADE CLASS-B',
      badge: isBn ? 'আন্তর্জাতিক স্বাস্থ্যবিধি' : '100% Sterile Autoclave',
      card1: {
        title: isBn ? '১০০% জীবাণুমুক্ত' : '100% Sterile',
        desc: isBn ? 'হাসপাতাল গ্রেড মান' : 'Class-B Autoclave',
      },
      card2: {
        title: isBn ? 'নিরাপদ সেবা' : 'Zero Infection',
        desc: isBn ? 'জীবাণুমুক্ত যন্ত্রপাতি' : 'Hospital Standards',
      },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Fast initial transition (1.2s on page entry so user immediately sees active sliding animation),
  // then regular 2.5s cadence continuously.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const initialDelay = currentSlide === 0 ? 1200 : 2500;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [currentSlide, prefersReducedMotion, heroSlides.length]);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
  };

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const activeSlide = heroSlides[currentSlide];

  const handleBookClick = (e) => {
    e.preventDefault();
    const appointmentEl = document.getElementById('appointment');
    if (appointmentEl) {
      appointmentEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollExplore = () => {
    const target = document.getElementById('services') || document.getElementById('why-us');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Continuous Highlight Ticker Items
  const tickerItems = isBn
    ? [
        '৩ডি নিখুঁত ডেন্টাল প্ল্যানিং',
        'কম রেডিয়েশন ডিজিটাল এক্স-রে',
        'বিএমডিসি স্বীকৃত ডেন্টাল সার্জন',
        '১০০% ক্লাস-বি অটোক্লেভ জীবাণুমুক্তকরণ',
        'ব্যথাহীন আরামদায়ক ডেন্টাল সেবা',
        'প্রাকৃতিক উজ্জ্বল হাসির নিখুঁত যত্ন',
      ]
    : [
        '3D CAD/CAM Digital Planning',
        'Low-Radiation Digital Panoramic X-Ray',
        'BMDC Registered Dental Surgeons',
        '100% Class-B Autoclave Hospital Sterilization',
        'Painless Comfort & Patient-First Care',
        'Natural Confident Smile Makeovers',
      ];

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#4A9BDA] via-[#78C4EF] to-[#8DD0F5] text-white pt-1.5 sm:pt-2 pb-2 sm:pb-2.5 selection:bg-brand-900 selection:text-white"
    >
      {/* Luminous Ambient Radial Glow Behind Center Stage */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 52%, rgba(255, 255, 255, 0.42) 0%, rgba(165, 222, 255, 0.22) 50%, transparent 78%)',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-900/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between items-center text-center">
        
        {/* ========================================================= */}
        {/* TOP STATUS & LOCATION PILL */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-1 sm:mb-1.5"
        >
          {/* Live Open / Closed Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/30 shadow-sm text-white">
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  openStatus.isOpen ? 'bg-emerald-300' : 'bg-amber-300'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  openStatus.isOpen ? 'bg-emerald-300' : 'bg-amber-300'
                }`}
              />
            </span>
            <span className="font-bold text-white tracking-wide">
              {isBn ? openStatus.labelBn : openStatus.labelEn}
            </span>
            <span className="text-white/50">·</span>
            <span className="text-white/90 font-normal text-[11px]">
              {isBn ? openStatus.detailBn : openStatus.detailEn}
            </span>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium bg-white/15 backdrop-blur-md text-white border border-white/25 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-cyan-200 shrink-0" />
            <span>{isBn ? 'কালশী, মিরপুর ১২' : 'Kalshi, Mirpur-12'}</span>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* EDITORIAL MINIMAL TYPOGRAPHY */}
        {/* ========================================================= */}
        <div className="max-w-3xl mx-auto pt-0.5">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] text-white/90 mb-1 drop-shadow-sm"
          >
            {t('hero.minimalEyebrow')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.45rem] font-bold tracking-tight text-white drop-shadow-[0_2px_14px_rgba(15,23,42,0.25)] leading-[1.14] mb-1"
          >
            <span className="block">{t('hero.minimalTitle1')}</span>
            <span className="block mt-0.5">{t('hero.minimalTitle2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl mx-auto font-normal px-2 drop-shadow-sm"
          >
            {t('hero.minimalSubtext')}
          </motion.p>
        </div>

        {/* ========================================================= */}
        {/* 3D MULTI-IMAGE STAGE CAROUSEL (Active and visible on entry) */}
        {/* ========================================================= */}
        <div className="relative w-full max-w-5xl mx-auto my-auto py-0.5 flex flex-col items-center justify-center">
          
          {/* Main 3D Stage: Displays Center Card + Visible Left & Right Cards */}
          <div className="relative w-full h-[255px] min-[400px]:h-[280px] sm:h-[315px] md:h-[340px] lg:h-[360px] flex items-center justify-center overflow-visible my-0.5 sm:my-1">
            
            {/* Ambient Cyan Radial Glow Behind Center Visual */}
            <div className="absolute inset-x-1/4 inset-y-4 rounded-full bg-cyan-200/40 blur-3xl pointer-events-none -z-10" />

            {/* Render All Cards with 3D Depth & Continuous Animated Positions */}
            {heroSlides.map((slide, idx) => {
              const total = heroSlides.length;
              let diff = (idx - currentSlide) % total;
              if (diff < -Math.floor(total / 2)) diff += total;
              if (diff > Math.floor(total / 2)) diff -= total;

              const isCenter = diff === 0;
              const isRight = diff === 1;
              const isLeft = diff === -1;
              const isVisible = Math.abs(diff) <= 1;

              // Responsive dynamic position styles
              // diff === 0: Center, scale 1.0, z 30
              // diff === 1: Right, scale 0.82, z 20, x ~70%
              // diff === -1: Left, scale 0.82, z 20, x ~-70%
              const xPos =
                diff === 0
                  ? '0%'
                  : diff === 1
                  ? '70%'
                  : diff === -1
                  ? '-70%'
                  : diff > 1
                  ? '135%'
                  : '-135%';

              const cardScale = isCenter ? 1 : isVisible ? 0.82 : 0.6;
              const cardOpacity = isCenter ? 1 : isVisible ? 0.72 : 0;
              const cardRotate = isCenter ? 0 : diff === 1 ? 3 : diff === -1 ? -3 : 0;
              const cardZIndex = isCenter ? 30 : isVisible ? 20 : 10;

              return (
                <motion.div
                  key={slide.id}
                  animate={{
                    x: xPos,
                    scale: cardScale,
                    opacity: cardOpacity,
                    rotate: cardRotate,
                    zIndex: cardZIndex,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => {
                    if (isRight) nextSlide();
                    if (isLeft) prevSlide();
                  }}
                  className={`absolute w-[260px] h-[230px] min-[400px]:w-[300px] min-[400px]:h-[260px] sm:w-[370px] sm:h-[295px] md:w-[415px] md:h-[320px] lg:w-[450px] lg:h-[345px] flex items-center justify-center select-none transition-shadow ${
                    isCenter
                      ? 'cursor-default pointer-events-auto'
                      : isVisible
                      ? 'cursor-pointer hover:opacity-90 active:scale-95 pointer-events-auto'
                      : 'pointer-events-none'
                  }`}
                  style={{ willChange: 'transform, opacity' }}
                >
                  {slide.isTooth ? (
                    /* Grand 3D Tooth Artwork with Seamless Radial Feather Blend */
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={getAssetUrl(slide.image)}
                        alt={slide.alt}
                        className="w-full h-full object-contain filter drop-shadow-[0_20px_42px_rgba(7,36,68,0.3)]"
                        style={{
                          maskImage:
                            'radial-gradient(circle at 50% 48%, black 48%, rgba(0, 0, 0, 0.7) 60%, transparent 74%)',
                          WebkitMaskImage:
                            'radial-gradient(circle at 50% 48%, black 48%, rgba(0, 0, 0, 0.7) 60%, transparent 74%)',
                        }}
                        loading="eager"
                      />
                      {/* Pill Badge at the bottom of the tooth */}
                      <div className="absolute bottom-2 inset-x-8 flex items-center justify-center px-3 py-1 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/25 text-white text-[10px] sm:text-xs font-semibold shadow-md">
                        <span className="truncate">{slide.tag}</span>
                      </div>
                    </div>
                  ) : (
                    /* Luxury Photographic Clinical Showcase Card with Glass Border */
                    <div className="relative w-full h-full rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_22px_45px_rgba(7,36,68,0.25)] border-2 border-white/65 backdrop-blur-md">
                      <img
                        src={getAssetUrl(slide.image)}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#072444]/65 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-sky-900/10 pointer-events-none" />

                      {/* Pill Badge on Card */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-950/65 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold">
                        <span className="truncate">{slide.tag}</span>
                        <span className="text-cyan-300 font-bold ml-1 shrink-0">✦</span>
                      </div>
                    </div>
                  )}

                  {/* Neighbor Preview Mini Badges */}
                  {isLeft && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-[9px] font-bold text-white border border-white/20 shadow-md">
                      Prev
                    </div>
                  )}
                  {isRight && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-[9px] font-bold text-white border border-white/20 shadow-md">
                      Next
                    </div>
                  )}

                  {/* Center Card Floating Pills (Desktop) */}
                  {isCenter && (
                    <>
                      {/* Left Pill */}
                      <motion.div
                        key={`pill1-${slide.id}`}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                        className="hidden md:flex absolute top-[44%] -translate-y-1/2 -left-10 lg:-left-20 xl:-left-24 z-40 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/50 hover:bg-white/65 backdrop-blur-xl border border-white/70 shadow-[0_12px_28px_rgba(7,36,68,0.14)]"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#072444] text-white flex items-center justify-center shrink-0 shadow-md">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs sm:text-sm font-bold text-slate-950 leading-tight">
                            {slide.card1.title}
                          </p>
                          <p className="text-[11px] text-slate-900/90 font-medium mt-0.5 whitespace-nowrap">
                            {slide.card1.desc}
                          </p>
                        </div>
                      </motion.div>

                      {/* Right Pill */}
                      <motion.div
                        key={`pill2-${slide.id}`}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                        className="hidden md:flex absolute top-[48%] -translate-y-1/2 -right-10 lg:-right-20 xl:-right-24 z-40 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/50 hover:bg-white/65 backdrop-blur-xl border border-white/70 shadow-[0_12px_28px_rgba(7,36,68,0.14)]"
                      >
                        <div className="w-8 h-8 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs sm:text-sm font-bold text-slate-950 leading-tight">
                            {slide.card2.title}
                          </p>
                          <p className="text-[11px] text-slate-900/90 font-medium mt-0.5 whitespace-nowrap">
                            {slide.card2.desc}
                          </p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Story-Style Real-time Animated Segmented Progress Bars */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/45 backdrop-blur-md border border-white/20 shadow-md mt-1 z-30">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className="relative h-1.5 w-7 sm:w-9 rounded-full bg-white/25 overflow-hidden transition-all focus:outline-none"
              >
                {idx === currentSlide ? (
                  <motion.div
                    key={`progress-${currentSlide}`}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: currentSlide === 0 ? 1.2 : 2.5,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  />
                ) : idx < currentSlide ? (
                  <div className="absolute inset-0 bg-white/80 rounded-full" />
                ) : null}
              </button>
            ))}
          </div>

          {/* Mobile Floating Pills Row (< md) */}
          <div className="flex md:hidden items-center justify-center gap-2.5 w-full max-w-sm px-2 mt-2 mb-1 z-30">
            <div className="flex-1 flex items-center gap-2 p-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm text-left">
              <div className="w-6 h-6 rounded-full bg-[#072444] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-950 truncate">{activeSlide.card1.title}</p>
                <p className="text-[10px] text-slate-900/90 truncate">{activeSlide.card1.desc}</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2 p-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 shadow-sm text-left">
              <div className="w-6 h-6 rounded-full bg-white text-slate-950 flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-950 truncate">{activeSlide.card2.title}</p>
                <p className="text-[10px] text-slate-900/90 truncate">{activeSlide.card2.desc}</p>
              </div>
            </div>
          </div>

          {/* Primary Centered Action Button & Contact Row */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-2 z-30 mt-1 sm:mt-1.5"
          >
            {/* Main "Book a Consultation" Pill Button */}
            <a
              href="#appointment"
              onClick={handleBookClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-white bg-[#072444] hover:bg-[#0c3966] active:scale-95 rounded-full shadow-[0_12px_28px_rgba(7,36,68,0.38)] hover:shadow-[0_16px_34px_rgba(7,36,68,0.5)] hover:scale-105 transition-all min-h-[44px] border border-cyan-300/30"
            >
              <Calendar className="w-4 h-4 text-cyan-200" />
              <span>{t('hero.minimalCta')}</span>
            </a>

            {/* Quick Contact Buttons Row */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={`tel:${clinicData.phoneRaw}`}
                aria-label="Call Clinic"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-950 bg-white/45 hover:bg-white/65 backdrop-blur-md border border-white/60 shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-slate-950" />
                <span>{t('hero.ctaCall')}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-100/75 hover:bg-emerald-100/95 backdrop-blur-md border border-emerald-300/60 shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>WhatsApp</span>
                <ArrowUpRight className="w-3 h-3 text-emerald-700" />
              </a>
            </div>
          </motion.div>

          {/* Continuous Silky-Smooth Dental Highlights Marquee Ribbon */}
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden py-1 px-2 my-1 pointer-events-none select-none">
            <div className="flex w-max items-center gap-4 sm:gap-6 animate-marquee">
              {tickerItems.concat(tickerItems).map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-white/90 uppercase tracking-wider whitespace-nowrap bg-white/15 backdrop-blur-md px-3 py-0.5 rounded-full border border-white/25 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-cyan-200 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* MINIMAL BOTTOM BAR: Metric Stats, Services & Scroll Explore */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35 }}
          className="w-full pt-1.5 sm:pt-2 pb-0.5 border-t border-white/25 flex flex-col md:flex-row items-center justify-between gap-2 text-white"
        >
          {/* Bottom Left: Patient Metric */}
          <div className="text-center md:text-left">
            <p className="text-xl sm:text-2xl font-black text-white tracking-tight font-display leading-tight drop-shadow-sm">
              {t('hero.minimalBottomStatsNum')}
            </p>
            <p className="text-xs text-white/90 font-medium">
              {t('hero.minimalBottomStatsLabel')}
            </p>
          </div>

          {/* Bottom Center: Key Clinical Pillars */}
          <div className="text-center">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/90 drop-shadow-sm">
              {t('hero.minimalServicesList')}
            </p>
          </div>

          {/* Bottom Right: Circular "SCROLL TO EXPLORE" Trigger */}
          <button
            type="button"
            onClick={handleScrollExplore}
            aria-label={t('hero.minimalScroll')}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-cyan-100 transition-colors focus:outline-none"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 flex items-center justify-center text-white group-hover:border-white group-hover:scale-110 transition-all">
              <ArrowDown className="w-3.5 h-3.5 text-white animate-bounce" />
            </div>
            <span className="text-[10px] sm:text-[11px] drop-shadow-sm">{t('hero.minimalScroll')}</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
