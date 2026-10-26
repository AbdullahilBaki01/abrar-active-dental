import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getAssetUrl } from '../utils/assets';

const galleryItems = [
  {
    id: 1,
    category: 'clinic',
    src: '/images/gallery-1.svg',
    titleEn: 'Modern Dental Operatory Suite',
    titleBn: 'আধুনিক ডেন্টাল অপারোটরি রুম',
    descEn: 'State-of-the-art ergonomic dental chair with integrated LED surgical lighting.',
    descBn: 'আরামদায়ক আধুনিক ডেন্টাল চেয়ার এবং উন্নত এলইডি সার্জিক্যাল লাইট সুবিধা।',
  },
  {
    id: 2,
    category: 'equipment',
    src: '/images/gallery-2.svg',
    titleEn: 'Hospital-Grade Autoclave Sterilization Unit',
    titleBn: 'হাসপাতাল মানের অটোক্লেভ স্টেরিলাইজেশন',
    descEn: 'Strict infection-control protocol with sealed sterilization pouches for every patient.',
    descBn: 'প্রতিটি রোগীর জন্য সিলযুক্ত জীবাণুমুক্ত পাউচে রাখা আন্তর্জাতিক মানের যন্ত্রপাতি।',
  },
  {
    id: 3,
    category: 'equipment',
    src: '/images/gallery-3.svg',
    titleEn: 'Digital RVG Dental Sensor & X-Ray',
    titleBn: 'ডিজিটাল আরভিজি ডেন্টাল সেন্সর ও এক্স-রে',
    descEn: 'Ultra-low radiation instant chairside digital imaging for accurate diagnosis.',
    descBn: '৯০% কম রেডিয়েশনযুক্ত তাত্ক্ষণিক ডিজিটাল রেডিওগ্রাফি ও ইমেজ ডিসপ্লে।',
  },
  {
    id: 4,
    category: 'smiles',
    src: '/images/gallery-4.svg',
    titleEn: 'Smile Whitening & Cosmetic Enhancement',
    titleBn: 'স্মাইল হোয়াইটেনিং ও সৌন্দর্য বৃদ্ধি',
    descEn: 'Cool LED light activated teeth bleaching restoring bright natural tooth shade.',
    descBn: 'দাঁতের স্বাভাবিক শুভ্রতা ও উজ্জ্বলতা ফিরিয়ে আনতে কুল এলইডি লাইট হোয়াইটেনিং।',
  },
  {
    id: 5,
    category: 'clinic',
    src: '/images/gallery-5.svg',
    titleEn: 'Gentle Pediatric Dental Corner',
    titleBn: 'শিশুদের জন্য বন্ধুত্বপূর্ণ পরিবেশ',
    descEn: 'Welcoming and friendly dental environment to eliminate fear for young children.',
    descBn: 'শিশুদের চিকিৎসাভীতি দূর করার মতো আন্তরিক ও ধৈর্যশীল পরিবেশ।',
  },
  {
    id: 6,
    category: 'smiles',
    src: '/images/gallery-6.svg',
    titleEn: 'Restorative Crowns & Bridges',
    titleBn: 'স্থায়ী ক্রাউন ও ব্রিজ প্রতিস্থাপন',
    descEn: 'High-strength biocompatible zirconia crowns preserving natural chewing ability.',
    descBn: 'উন্নত মানের জিরকোনিয়া ক্যাপ যা হারানো দাঁতের স্বাভাবিক সৌন্দর্য ও শক্তি ফিরিয়ে দেয়।',
  },
];

export default function Gallery() {
  const { t, isBn } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 3);

  const handleOpenLightbox = (index) => {
    setSelectedIdx(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIdx(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedIdx !== null) {
      setSelectedIdx((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  }, [selectedIdx, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (selectedIdx !== null) {
      setSelectedIdx((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  }, [selectedIdx, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, handlePrev, handleNext]);

  return (
    <section id="gallery" className="py-14 sm:py-20 bg-gradient-to-b from-white via-[#8DD0F5]/12 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#072444] bg-[#8DD0F5]/30 px-3.5 py-1 rounded-full border border-[#78C4EF]/60 shadow-sm inline-block mb-3">
            {t('gallery.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072444] tracking-tight mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t('gallery.desc')}
          </p>
          <p className="text-xs text-[#072444] bg-[#8DD0F5]/20 border border-[#78C4EF]/50 rounded-lg py-1 px-3 inline-block mt-3">
            {t('gallery.placeholderNotice')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { key: 'all', label: t('gallery.filterAll') },
            { key: 'clinic', label: t('gallery.filterClinic') },
            { key: 'equipment', label: t('gallery.filterEquipment') },
            { key: 'smiles', label: t('gallery.filterSmiles') },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all min-h-[40px] focus:outline-none focus:ring-2 focus:ring-[#4A9BDA] ${
                activeFilter === tab.key
                  ? 'bg-[#072444] text-white shadow-md shadow-[#072444]/25 border border-cyan-400/30'
                  : 'bg-[#8DD0F5]/20 text-slate-700 hover:bg-[#8DD0F5]/35 border border-[#78C4EF]/45'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedItems.map((item, index) => {
            const title = isBn ? item.titleBn : item.titleEn;
            const desc = isBn ? item.descBn : item.descEn;

            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                className="group relative rounded-3xl overflow-hidden bg-white/95 border border-[#8DD0F5]/45 shadow-[0_4px_20px_rgba(74,155,218,0.06)] hover:shadow-[0_16px_32px_rgba(74,155,218,0.18)] hover:border-[#4A9BDA] hover:-translate-y-2 cursor-pointer transition-all duration-300"
              >
                {/* Hero sky/light-sky/soft-aqua hover top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4A9BDA] via-[#78C4EF] to-[#8DD0F5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50">
                  <img
                    src={getAssetUrl(item.src)}
                    alt={title}
                    width="600"
                    height="450"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
                      <p className="text-xs text-slate-200 line-clamp-2">{desc}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0 ml-3 group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Mobile visible label below image */}
                <div className="p-4 bg-white border-t border-slate-100 sm:hidden">
                  <h3 className="text-xs font-bold text-[#072444]">{title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More / Show Less Button */}
        {filteredItems.length > 3 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-[#072444] bg-[#8DD0F5]/25 hover:bg-[#8DD0F5]/40 active:scale-95 border border-[#78C4EF]/60 rounded-full shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#4A9BDA] min-h-[44px]"
            >
              <span>{showAll ? t('gallery.seeLess') : `${t('gallery.seeMore')} (${filteredItems.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

      </div>

      {/* Accessible Modal Lightbox */}
      {selectedIdx !== null && filteredItems[selectedIdx] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/90 backdrop-blur-md p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview lightbox"
          onClick={handleCloseLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleCloseLightbox}
            aria-label="Close image lightbox"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content Card inside Lightbox */}
          <div
            className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] max-h-[65vh] bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src={getAssetUrl(filteredItems[selectedIdx].src)}
                alt={isBn ? filteredItems[selectedIdx].titleBn : filteredItems[selectedIdx].titleEn}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 bg-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy-900">
                    {isBn ? filteredItems[selectedIdx].titleBn : filteredItems[selectedIdx].titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {isBn ? filteredItems[selectedIdx].descBn : filteredItems[selectedIdx].descEn}
                  </p>
                </div>
                <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                  {selectedIdx + 1} / {filteredItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
