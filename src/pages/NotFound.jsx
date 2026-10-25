import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Phone, ArrowLeft } from 'lucide-react';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';

export default function NotFound() {
  const { t, isBn } = useLanguage();

  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The requested page could not be found."
        canonicalUrl={`${clinicData.siteUrl}/404`}
      />

      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50/50">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-soft-lg text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-5 border border-brand-100">
            <span className="text-2xl font-black">404</span>
          </div>

          <h1 className="text-2xl font-extrabold text-navy-950 mb-2">
            {t('notFound.title')}
          </h1>

          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            {t('notFound.desc')}
          </p>

          <div className="space-y-3">
            <Link
              to="/"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-600/20 transition-all min-h-[44px]"
            >
              <Home className="w-4 h-4" />
              <span>{t('notFound.backHome')}</span>
            </Link>

            <a
              href={`tel:${clinicData.phoneRaw}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              <span>{t('notFound.callClinic')}: {clinicData.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
