import React from 'react';
import { Award, Calendar, Clock, Stethoscope } from 'lucide-react';
import { doctorsData } from '../data/doctors';
import { useLanguage } from '../i18n/LanguageContext';
import { getAssetUrl } from '../utils/assets';

export default function Doctors({ onSelectDoctor }) {
  const { t, isBn } = useLanguage();

  const handleBookDoctor = (doctorId) => {
    if (onSelectDoctor) {
      onSelectDoctor(doctorId);
    }
    const appointmentEl = document.getElementById('appointment');
    if (appointmentEl) {
      appointmentEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="doctors" className="py-14 sm:py-20 bg-gradient-to-b from-[#8DD0F5]/20 via-[#78C4EF]/08 to-slate-50/70 border-y border-[#8DD0F5]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#072444] bg-[#8DD0F5]/30 px-3.5 py-1 rounded-full border border-[#78C4EF]/60 shadow-sm inline-block mb-3">
            {t('doctors.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072444] tracking-tight mb-4">
            {t('doctors.title')}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t('doctors.desc')}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className={`grid grid-cols-1 ${doctorsData.length > 1 ? 'md:grid-cols-2 max-w-4xl' : 'max-w-xl'} gap-8 mx-auto`}>
          {doctorsData.map((doctor) => {
            const name = isBn ? doctor.nameBn : doctor.name;
            const title = isBn ? doctor.titleBn : doctor.title;
            const degree = isBn ? doctor.degreeBn : doctor.degree;
            const speciality = isBn ? doctor.specialityBn : doctor.speciality;
            const availability = isBn ? doctor.availabilityBn : doctor.availability;
            const bio = isBn ? doctor.bioBn : doctor.bio;
            const bmdc = isBn ? doctor.bmdcRegNoBn : doctor.bmdcRegNo;

            return (
              <div
                key={doctor.id}
                className="group relative bg-white/95 rounded-3xl overflow-hidden border border-[#8DD0F5]/45 shadow-[0_4px_20px_rgba(74,155,218,0.06)] hover:shadow-[0_16px_32px_rgba(74,155,218,0.18)] hover:border-[#4A9BDA] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Hero sky/light-sky/soft-aqua hover top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4A9BDA] via-[#78C4EF] to-[#8DD0F5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                <div>
                  {/* Photo Banner with Sky Aqua Ambient */}
                  <div className="relative bg-gradient-to-b from-[#8DD0F5]/30 via-sky-50 to-[#78C4EF]/15 p-6 flex justify-center items-center border-b border-[#8DD0F5]/40">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-white">
                      <img
                        src={getAssetUrl(doctor.photo)}
                        alt={`${name} - ${title}`}
                        width="400"
                        height="480"
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-bold text-[#072444] border border-[#78C4EF]/60 flex items-center gap-1 shadow-sm">
                      <Award className="w-3.5 h-3.5 text-[#4A9BDA]" />
                      <span>{t('hero.trustChip2')}</span>
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div className="p-6 sm:p-7">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-[#072444] bg-[#8DD0F5]/25 border border-[#78C4EF]/50 px-2.5 py-0.5 rounded-full inline-block">
                          {speciality}
                        </span>
                        <span className="text-xs font-semibold text-[#072444] bg-[#78C4EF]/20 border border-[#78C4EF]/45 px-2.5 py-0.5 rounded-full inline-block">
                          {bmdc}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#072444] group-hover:text-[#4A9BDA] transition-colors">
                        {name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#4A9BDA]">
                        {title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {degree}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {bio}
                    </p>

                    {/* Schedule availability */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-[#8DD0F5]/15 border border-[#8DD0F5]/40 rounded-xl p-3 mb-6">
                      <Clock className="w-4 h-4 text-[#4A9BDA] shrink-0" />
                      <span>{availability}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 sm:p-7 pt-0">
                  <button
                    type="button"
                    onClick={() => handleBookDoctor(doctor.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#072444] to-[#0c3966] hover:from-[#4A9BDA] hover:to-[#072444] active:scale-95 rounded-full shadow-sm hover:shadow-md hover:shadow-[#4A9BDA]/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#4A9BDA] min-h-[44px]"
                  >
                    <Calendar className="w-4 h-4 text-cyan-200" />
                    <span>{isBn ? `${name} এর সাথে অ্যাপয়েন্টমেন্ট` : `Book with ${name}`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
