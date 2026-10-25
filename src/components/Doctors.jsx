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
    <section id="doctors" className="py-14 sm:py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-100 inline-block mb-3">
            {t('doctors.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight mb-4">
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
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-400 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Dental cyan hover top accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-dental-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                <div>
                  {/* Photo Banner */}
                  <div className="relative bg-gradient-to-b from-brand-50 to-slate-100 p-6 flex justify-center items-center border-b border-slate-100">
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
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-brand-700 border border-brand-100 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>{bmdc.split('(')[0].trim()}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy-900 mb-1">
                      {name}
                    </h3>
                    <p className="text-sm font-semibold text-brand-700 mb-2">
                      {title}
                    </p>
                    
                    {/* Degree */}
                    <div className="flex items-start gap-2 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Stethoscope className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{degree}</span>
                    </div>

                    {/* Speciality */}
                    <p className="text-xs text-slate-500 mb-2">
                      <strong className="text-slate-700">{t('doctors.speciality')}:</strong> {speciality}
                    </p>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {bio}
                    </p>

                    {/* Hours */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{availability}</span>
                    </div>
                  </div>
                </div>

                {/* Book Action Footer */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => handleBookDoctor(doctor.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.99] rounded-xl shadow-md shadow-brand-600/15 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[44px]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t('doctors.bookWith')} {name}</span>
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
