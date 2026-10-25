import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Phone, MessageSquare } from 'lucide-react';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';
import SEO from '../components/SEO';

export default function Privacy() {
  const { isBn } = useLanguage();

  return (
    <>
      <SEO
        title={`Privacy Policy | ${clinicData.name}`}
        description="Patient data privacy, confidentiality, and appointment inquiry terms for Abrar Active Dental."
        canonicalUrl={`${clinicData.siteUrl}/privacy`}
      />

      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Homepage</span>
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                {isBn ? 'রোগীর তথ্যের গোপনীয়তা নীতি' : 'Patient Privacy & Confidentiality'}
              </h1>
              <p className="text-xs text-slate-500">
                Last updated: October 2026 • {clinicData.name}
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm sm:text-base leading-relaxed">
            <section className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-navy-900 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-600" />
                <span>Our Medical Confidentiality Commitment</span>
              </h2>
              <p>
                At {clinicData.name}, protecting your personal and dental medical records is of paramount importance. We adhere strictly to standard medical ethics and privacy guidelines.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-navy-900 mb-2">1. What Information We Collect</h3>
              <p>
                When you request an appointment through our website or contact us via phone or WhatsApp, we collect only necessary scheduling information:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                <li>Your name and contact mobile phone number</li>
                <li>Preferred consultation date, time, and service reason</li>
                <li>Any dental symptoms or notes you choose to share voluntarily</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-bold text-navy-900 mb-2">2. How Your Information is Used</h3>
              <p>
                The information you provide is used strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                <li>Coordinate, confirm, or reschedule your dental appointments</li>
                <li>Prepare our clinical staff and dental operatory for your specific visit</li>
                <li>Answer your health inquiries directly on WhatsApp or over the phone</li>
              </ul>
              <p className="mt-2 text-sm text-slate-500">
                We do not sell, rent, trade, or share your contact numbers or medical information with third-party advertisers or telemarketers.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-navy-900 mb-2">3. WhatsApp Communication</h3>
              <p>
                Our online booking helper creates a prefilled message that opens directly in WhatsApp. All chats conducted via WhatsApp are protected by WhatsApp's end-to-end encryption.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-navy-900 mb-2">4. Contact & Inquiries</h3>
              <p>
                If you have questions regarding your dental records or wish to update your details, please contact us directly:
              </p>
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                <p><strong>{clinicData.name}</strong></p>
                <p>{clinicData.address.fullAddress}</p>
                <p>Phone: {clinicData.phone}</p>
                <p>Email: {clinicData.email}</p>
              </div>
            </section>
          </div>

        </div>
      </div>
    </>
  );
}
