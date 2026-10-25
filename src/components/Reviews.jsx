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
    <section id="reviews" className="py-16 sm:py-24 bg-slate-50/60 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3.5 py-1 rounded-full border border-brand-100 inline-block mb-3">
            {t('reviews.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight mb-3">
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
                className="group relative bg-white rounded-3xl p-7 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-400 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Dental cyan hover top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-dental-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Rating & Treatment Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-100/70">
                      {treatment}
                    </span>
                  </div>

                  {/* Quote Icon & Content */}
                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-brand-200 absolute -top-1 -left-1 opacity-40 -z-0" />
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic relative z-10 font-medium">
                      "{comment}"
                    </p>
                  </div>
                </div>

                {/* Patient Profile Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center text-sm shadow-inner group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-900 group-hover:text-brand-700 transition-colors">
                      {name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {location} • {t('reviews.verified')}
                    </p>
                  </div>
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
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-brand-700 bg-white hover:bg-brand-50 active:scale-95 border border-brand-200 rounded-2xl shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[44px]"
            >
              <span>{showAll ? t('reviews.seeLess') : `${t('reviews.seeMore')} (${reviewsData.length})`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* Review Us on Facebook Callout Banner */}
        <div className="mt-14 max-w-3xl mx-auto bg-gradient-to-r from-blue-50/90 via-sky-50/70 to-blue-50/90 rounded-3xl p-6 sm:p-7 border border-blue-100/90 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/20">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-navy-900">
                {t('reviews.reviewOnFb')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {t('reviews.fbCommunity')}
              </p>
            </div>
          </div>

          <a
            href={clinicData.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-md shadow-blue-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[44px] whitespace-nowrap"
          >
            <span>{t('reviews.reviewOnFb')}</span>
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
