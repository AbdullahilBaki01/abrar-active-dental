import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Calendar, Facebook } from 'lucide-react';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';
import { useOpenNow } from '../hooks/useOpenNow';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function Contact() {
  const { t, isBn, language } = useLanguage();
  const openStatus = useOpenNow();
  const whatsappUrl = generateGeneralWhatsAppUrl(language);

  const addressText = isBn ? clinicData.address.fullAddressBn : clinicData.address.fullAddress;
  const landmarksText = isBn ? clinicData.address.landmarksBn : clinicData.address.landmarks;

  return (
    <section id="contact" className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-100 inline-block mb-3">
            {t('contact.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-900 tracking-tight mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {t('contact.desc')}
          </p>
        </div>

        {/* Contact Info & Google Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Hours */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Status Card */}
            <div className={`p-5 rounded-2xl border flex items-center justify-between ${
              openStatus.isOpen
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-amber-50/70 border-amber-200'
            }`}>
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${openStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <div>
                  <h4 className="text-sm font-bold text-navy-900">
                    {isBn ? openStatus.labelBn : openStatus.labelEn}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {isBn ? openStatus.detailBn : openStatus.detailEn}
                  </p>
                </div>
              </div>

              <a
                href="#appointment"
                className="px-3 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm"
              >
                {t('hero.ctaBook')}
              </a>
            </div>

            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900 mb-1">
                    {t('contact.addressTitle')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {addressText}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    ({landmarksText})
                  </p>

                  <a
                    href={clinicData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-brand-700 hover:text-brand-800"
                  >
                    <span>{t('contact.getDirections')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-navy-900 mb-1">
                    {t('contact.phoneTitle')}
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mb-3">
                    <a href={`tel:${clinicData.phoneRaw}`} className="hover:text-brand-600">
                      {clinicData.phone}
                    </a>
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`tel:${clinicData.phoneRaw}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-600" />
                      <span>{t('hero.ctaCall')}</span>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Hours Schedule Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-navy-900 mb-2">
                    {t('contact.hoursTitle')}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex justify-between py-1 border-b border-slate-100">
                      <span className="font-medium">{isBn ? 'শনিবার – বৃহস্পতিবার' : 'Saturday – Thursday'}</span>
                      <span className="font-semibold text-slate-800">5:00 PM – 10:00 PM</span>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-100">
                      <span className="font-medium">{isBn ? 'শুক্রবার' : 'Friday'}</span>
                      <span className="font-semibold text-slate-800">4:00 PM – 9:00 PM</span>
                    </li>
                  </ul>
                  <p className="text-[11px] text-slate-400 mt-2">
                    {isBn ? clinicData.displayHours.noteBn : clinicData.displayHours.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Facebook Link Banner */}
            <a
              href={clinicData.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-soft transition-all"
            >
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-bold">{t('contact.followFb')}</span>
              </div>
              <ExternalLink className="w-4 h-4" />
            </a>

          </div>

          {/* Right Column: Google Maps Embed Card */}
          <div className="lg:col-span-7 h-full">
            <div className="bg-white rounded-3xl p-3 border border-slate-200/90 shadow-soft-lg h-full flex flex-col">
              <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  title="Abrar Active Dental Google Maps Location"
                  src={clinicData.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
                <div>
                  <h4 className="text-sm font-bold text-navy-900">
                    {isBn ? clinicData.nameBn : clinicData.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {addressText}
                  </p>
                </div>

                <a
                  href={clinicData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors min-h-[40px]"
                >
                  <span>{t('contact.getDirections')}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
