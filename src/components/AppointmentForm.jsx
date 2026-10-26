import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle, MessageSquare, AlertCircle, PhoneCall, ExternalLink, X } from 'lucide-react';
import { clinicData } from '../data/clinic';
import { servicesData } from '../data/services';
import { doctorsData } from '../data/doctors';
import { useLanguage } from '../i18n/LanguageContext';
import { validateBangladeshiPhone } from '../utils/validators';
import { generateWhatsAppUrl } from '../utils/whatsapp';

export default function AppointmentForm({ initialService = '', initialDoctor = '' }) {
  const { t, isBn, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '5:00 PM – 7:00 PM (Evening)',
    service: initialService,
    doctor: initialDoctor,
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState(null);

  // Sync props if user clicked "Book this" on service or doctor cards
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialDoctor) {
      setFormData((prev) => ({ ...prev, doctor: initialDoctor }));
    }
  }, [initialDoctor]);

  // Today string for date input min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('appointment.errors.nameRequired');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('appointment.errors.phoneRequired');
    } else if (!validateBangladeshiPhone(formData.phone)) {
      newErrors.phone = t('appointment.errors.phoneInvalid');
    }

    if (!formData.date) {
      newErrors.date = t('appointment.errors.dateRequired');
    }

    if (!formData.service) {
      newErrors.service = t('appointment.errors.serviceRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const selectedService = servicesData.find((s) => s.id === formData.service);
      const selectedDoctor = doctorsData.find((d) => d.id === formData.doctor);
      const serviceLabel = selectedService
        ? (isBn ? selectedService.titleBn : selectedService.titleEn)
        : formData.service;
      const doctorLabel = selectedDoctor
        ? (isBn ? selectedDoctor.nameBn : selectedDoctor.name)
        : formData.doctor;

      const whatsappUrl = generateWhatsAppUrl({
        ...formData,
        service: serviceLabel,
        doctor: doctorLabel,
        language,
      });

      // 2. Extensible point: Future backend endpoint POST can be added here
      // await fetch('/api/appointments', { method: 'POST', body: JSON.stringify(formData) });

      // 3. Open WhatsApp link
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // 4. Set state to show reassuring success modal
      setSubmittedWhatsAppUrl(whatsappUrl);
    } catch (err) {
      console.error('Failed to prepare appointment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-14 sm:py-20 bg-gradient-to-b from-[#8DD0F5]/25 via-sky-50/50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#072444] bg-[#8DD0F5]/30 px-3.5 py-1 rounded-full border border-[#78C4EF]/60 shadow-sm inline-block mb-3">
            {t('appointment.subtitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072444] tracking-tight mb-4">
            {t('appointment.title')}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('appointment.desc')}
          </p>
        </div>

        {/* Appointment Form Card */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-10 border border-[#8DD0F5]/50 shadow-[0_12px_40px_rgba(74,155,218,0.12)]">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-[#072444] mb-2">
                  {t('appointment.nameLabel')} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('appointment.namePlaceholder')}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 min-h-[48px] ${
                      errors.name
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400 text-rose-900'
                        : 'border-slate-300 focus:border-sky-400 focus:ring-sky-400 text-slate-900'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Phone Number (BD Format) */}
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-bold text-navy-900 mb-2">
                  {t('appointment.phoneLabel')} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('appointment.phonePlaceholder')}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 min-h-[48px] ${
                      errors.phone
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400 text-rose-900'
                        : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500 text-slate-900'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-xs sm:text-sm font-bold text-navy-900 mb-2">
                  {t('appointment.serviceLabel')} <span className="text-rose-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 min-h-[48px] bg-white ${
                    errors.service
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400 text-rose-900'
                      : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500 text-slate-900'
                  }`}
                >
                  <option value="">{isBn ? '-- একটি সেবা নির্বাচন করুন --' : '-- Choose a Treatment --'}</option>
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.id}>
                      {isBn ? s.titleBn : s.titleEn}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.service}</span>
                  </p>
                )}
              </div>

              {/* Preferred Doctor (Optional) */}
              <div>
                <label htmlFor="doctor" className="block text-xs sm:text-sm font-bold text-navy-900 mb-2">
                  {t('appointment.doctorLabel')}
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 text-sm text-slate-900 min-h-[48px] bg-white"
                >
                  <option value="">{t('appointment.anyDoctor')}</option>
                  {doctorsData.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {isBn ? doc.nameBn : doc.name} ({isBn ? doc.specialityBn.split(',')[0] : doc.speciality.split(',')[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label htmlFor="date" className="block text-xs sm:text-sm font-bold text-navy-900 mb-2">
                  {t('appointment.dateLabel')} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 min-h-[48px] ${
                      errors.date
                        ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-400 text-rose-900'
                        : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500 text-slate-900'
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.date}</span>
                  </p>
                )}
              </div>

              {/* Preferred Time Slot */}
              <div>
                <label htmlFor="time" className="block text-xs sm:text-sm font-bold text-navy-900 mb-2">
                  {t('appointment.timeLabel')} <span className="text-rose-500">*</span>
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 text-sm text-slate-900 min-h-[48px] bg-white"
                >
                  <option value="5:00 PM – 7:00 PM (Evening)">5:00 PM – 7:00 PM (Evening / বিকাল)</option>
                  <option value="7:00 PM – 9:00 PM (Night)">7:00 PM – 9:00 PM (Night / রাত)</option>
                  <option value="9:00 PM – 10:00 PM (Late Night)">9:00 PM – 10:00 PM (Late Evening / রাত)</option>
                  <option value="Friday 4:00 PM – 9:00 PM">Friday 4:00 PM – 9:00 PM (শুক্রবার)</option>
                </select>
              </div>

            </div>

            {/* Symptoms or Notes */}
            <div>
              <label htmlFor="notes" className="block text-xs sm:text-sm font-bold text-navy-900 mb-2">
                {t('appointment.notesLabel')}
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder={t('appointment.notesPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 text-sm text-slate-900"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-bold text-white bg-gradient-to-r from-[#072444] via-[#0c3966] to-[#4A9BDA] hover:from-[#4A9BDA] hover:to-[#072444] active:scale-[0.98] rounded-full shadow-lg shadow-[#4A9BDA]/25 transition-all focus:outline-none focus:ring-3 focus:ring-[#4A9BDA] min-h-[50px] disabled:opacity-75"
              >
                <MessageSquare className="w-5 h-5 text-cyan-200" />
                <span>{isSubmitting ? t('appointment.sending') : t('appointment.submitBtn')}</span>
              </button>

              <a
                href={`tel:${clinicData.phoneRaw}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#072444] p-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-sky-600" />
                <span>{t('appointment.callInstead')}</span>
              </a>
            </div>

            {/* Privacy Guarantee Note */}
            <p className="text-center text-xs text-slate-400 pt-3">
              {t('appointment.privacyNote')}
            </p>
          </form>
        </div>

      </div>

      {/* Success Modal */}
      {submittedWhatsAppUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-bold text-navy-900 mb-2">
              {t('appointment.successModal.title')}
            </h3>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {t('appointment.successModal.desc')}
            </p>

            <div className="space-y-3">
              <a
                href={submittedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md min-h-[44px]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t('appointment.successModal.openWhatsappBtn')}</span>
              </a>

              <a
                href={`tel:${clinicData.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-[#072444]" />
                <span>{t('appointment.successModal.callInsteadBtn')}</span>
              </a>

              <button
                type="button"
                onClick={() => setSubmittedWhatsAppUrl(null)}
                className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                {t('appointment.successModal.doneBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
