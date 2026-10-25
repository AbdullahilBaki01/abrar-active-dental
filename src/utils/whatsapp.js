import { clinicData } from '../data/clinic';
import { normalizePhoneForWhatsApp } from './validators';

/**
 * Builds formatted text message for WhatsApp appointment request
 */
export function buildWhatsAppAppointmentMessage({
  name,
  phone,
  service,
  doctor,
  date,
  time,
  notes,
  language = 'en',
}) {
  const isBn = language === 'bn';

  if (isBn) {
    return [
      `*অ্যাপয়েন্টমেন্ট বুকিং রিকোয়েস্ট — আবরার একটিভ ডেন্টাল*`,
      ``,
      `👤 *রোগীর নাম:* ${name}`,
      `📞 *ফোন নম্বর:* ${phone}`,
      `🦷 *প্রয়োজনীয় সেবা:* ${service || 'সাধারণ চেকআপ'}`,
      doctor ? `👨‍⚕️ *পছন্দের ডাক্তার:* ${doctor}` : null,
      `📅 *পছন্দের তারিখ:* ${date}`,
      `⏰ *পছন্দের সময়:* ${time}`,
      notes ? `📝 *সমস্যা/মন্তব্য:* ${notes}` : null,
      ``,
      `_ওয়েবসাইট থেকে প্রেরিত। অনুগ্রহ করে সময় নিশ্চিত করুন। ধন্যবাদ!_`,
    ]
      .filter(Boolean)
      .join('\n');
  }

  return [
    `*Appointment Request — Abrar Active Dental*`,
    ``,
    `👤 *Patient Name:* ${name}`,
    `📞 *Contact Number:* ${phone}`,
    `🦷 *Treatment Required:* ${service || 'General Consultation'}`,
    doctor ? `👨‍⚕️ *Preferred Doctor:* ${doctor}` : null,
    `📅 *Preferred Date:* ${date}`,
    `⏰ *Preferred Time:* ${time}`,
    notes ? `📝 *Symptoms/Notes:* ${notes}` : null,
    ``,
    `_Sent via Clinic Website. Please confirm my appointment slot. Thank you!_`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Generates direct wa.me link with encoded appointment text
 */
export function generateWhatsAppUrl(formData) {
  const cleanClinicNumber = normalizePhoneForWhatsApp(clinicData.whatsapp);
  const message = buildWhatsAppAppointmentMessage(formData);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanClinicNumber}?text=${encodedText}`;
}

/**
 * Simple general WhatsApp enquiry URL
 */
export function generateGeneralWhatsAppUrl(language = 'en') {
  const cleanClinicNumber = normalizePhoneForWhatsApp(clinicData.whatsapp);
  const defaultText = language === 'bn'
    ? 'হ্যালো আবরার একটিভ ডেন্টাল, আমি দাঁতের চিকিৎসা সম্পর্কে তথ্য ও অ্যাপয়েন্টমেন্ট জানতে চাচ্ছি।'
    : 'Hello Abrar Active Dental, I would like to inquire about dental consultation & appointments.';
  return `https://wa.me/${cleanClinicNumber}?text=${encodeURIComponent(defaultText)}`;
}
