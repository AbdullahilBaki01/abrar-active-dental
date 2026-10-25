import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Phone,
  CheckCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { servicesData } from '../data/services';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';
import { generateGeneralWhatsAppUrl } from '../utils/whatsapp';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, isBn, language } = useLanguage();

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-2">Service Not Found</h1>
        <p className="text-slate-600 mb-6">The requested dental service could not be found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  const title = isBn ? service.titleBn : service.titleEn;
  const shortDesc = isBn ? service.shortDescBn : service.shortDescEn;
  const fullDesc = isBn ? service.fullDescBn : service.fullDescEn;
  const benefits = isBn ? service.benefitsBn : service.benefitsEn;
  const steps = isBn ? service.stepsBn : service.stepsEn;
  const suitableFor = isBn ? service.suitableForBn : service.suitableFor;
  const whatsappUrl = generateGeneralWhatsAppUrl(language);

  // Procedure schema
  const procedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.titleEn,
    description: service.shortDescEn,
    procedureType: 'NonSurgicalProcedure',
    bodyLocation: 'Mouth / Teeth',
    relevantSpecialty: {
      '@type': 'MedicalSpecialty',
      name: 'Dentistry',
    },
    provider: {
      '@type': 'Dentist',
      name: clinicData.name,
      telephone: clinicData.phoneRaw,
      address: {
        '@type': 'PostalAddress',
        streetAddress: clinicData.address.line1,
        addressLocality: clinicData.address.area,
        addressRegion: clinicData.address.city,
        addressCountry: 'BD',
      },
    },
  };

  const handleBookNow = () => {
    navigate(`/?service=${encodeURIComponent(service.slug)}#appointment`);
  };

  return (
    <>
      <SEO
        title={`${title} | ${isBn ? clinicData.nameBn : clinicData.name}`}
        description={shortDesc}
        canonicalUrl={`${clinicData.siteUrl}/services/${service.slug}`}
        schemaCustom={procedureSchema}
      />

      <article className="py-8 sm:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500">
              <li>
                <Link to="/" className="hover:text-brand-600 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li>
                <Link to="/#services" className="hover:text-brand-600 transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none">
                {title}
              </li>
            </ol>
          </nav>

          {/* Back button */}
          <Link
            to="/#services"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800 mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t('services.backToServices')}</span>
          </Link>

          {/* Service Title & Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-100 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Abrar Active Dental Service</span>
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 tracking-tight leading-tight mb-4">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {shortDesc}
            </p>
          </div>

          {/* Info Highlights Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-10">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {t('services.duration')}
                </span>
                <span className="text-sm font-bold text-navy-900">
                  {service.duration}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {t('services.suitableFor')}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-800">
                  {suitableFor}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="prose prose-slate max-w-none mb-10">
            <h2 className="text-xl font-bold text-navy-900 mb-3">
              {isBn ? 'চিকিৎসা সম্পর্কিত বিস্তারিত তথ্য' : 'About this Treatment'}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {fullDesc}
            </p>
          </div>

          {/* Key Benefits */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-navy-900 mb-4">
              {t('services.benefitsTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-brand-50/40 border border-brand-100"
                >
                  <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-800 leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Procedure Steps */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-navy-900 mb-4">
              {t('services.stepsTitle')}
            </h3>
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/90 bg-white"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-900 mb-0.5">
                      {step}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="bg-gradient-to-tr from-brand-800 to-brand-600 rounded-3xl p-6 sm:p-10 text-white shadow-soft-lg">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold mb-3">
                {t('services.readyToBook')}
              </h3>
              <p className="text-sky-100 text-sm sm:text-base leading-relaxed mb-6">
                {t('services.readyToBookDesc')}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleBookNow}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-brand-950 bg-white hover:bg-teal-50 rounded-xl transition-all shadow-md min-h-[48px]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('hero.ctaBook')}</span>
                </button>

                <a
                  href={`tel:${clinicData.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl transition-all min-h-[48px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>{clinicData.phone}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </article>
    </>
  );
}
