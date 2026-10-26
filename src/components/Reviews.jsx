import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, ChevronDown, Quote } from 'lucide-react';
import { reviewsData } from '../data/reviews';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';

export default function Reviews() {
  const { t, isBn } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviewsData : reviewsData.slice(0, 3);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-gradient-to-b from-[#8DD0F5]/18 via-sky-50/40 to-slate-50/60 border-y border-[#8DD0F5]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#072444] bg-[#8DD0F5]/30 px-3.5 py-1 rounded-full border border-[#78C4EF]/60 shadow-sm inline-block mb-3">
            {t('reviews.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072444] tracking-tight mb-3">
            {t('reviews.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t('reviews.desc')}
          </p>
        </div>

        {/* 3 Boxes Grid (Expandable to All) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedReviews.map((review) => {
            const name = isBn ? review.nameBn : review.name;
            const location = isBn ? review.locationBn : review.location;
            const treatment = isBn ? review.treatmentBn : review.treatment;
            const comment = isBn ? review.commentBn : review.comment;

            return (
              <div
                key={review.id}
                className="group relative bg-white/95 rounded-3xl p-7 border border-[#8DD0F5]/45 shadow-[0_4px_20px_rgba(74,155,218,0.06)] hover:shadow-[0_16px_32px_rgba(74,155,218,0.18)] hover:border-[#4A9BDA] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Hero sky/light-sky/soft-aqua hover top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4A9BDA] via-[#78C4EF] to-[#8DD0F5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Rating & Treatment Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#8DD0F5]/25 text-[#072444] border border-[#78C4EF]/45">
                      {treatment}
                    </span>
                  </div>

                  {/* Quote Icon & Content */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-[#8DD0F5]/40 absolute -top-3 -left-2 -z-0 opacity-60" />
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic relative z-10 font-normal">
                      "{comment}"
                    </p>
                  </div>
                </div>

                {/* Patient Signature Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#072444] group-hover:text-[#4A9BDA] transition-colors">
                      {name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {location} • {review.date}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <ThumbsUp className="w-3 h-3 text-emerald-600" />
                    <span>{isBn ? 'সন্তুষ্ট রোগী' : 'Verified'}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More / Show Less Button */}
        {reviewsData.length > 3 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-[#072444] bg-[#8DD0F5]/25 hover:bg-[#8DD0F5]/40 active:scale-95 border border-[#78C4EF]/60 rounded-full shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#4A9BDA] min-h-[44px]"
            >
              <span>{showAll ? t('reviews.seeLess') : `${t('reviews.seeMore')} (${reviewsData.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
