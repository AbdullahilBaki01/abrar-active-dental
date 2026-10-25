/**
 * Form Validation Utilities for Bangladeshi Dental Patients
 */

/**
 * Validates a Bangladeshi mobile phone number.
 * Accepts formats:
 * - 01712345678
 * - +8801712345678
 * - 8801712345678
 * - 01712-345678
 * - +880 1712 345678
 */
export function validateBangladeshiPhone(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') return false;
  // Strip spaces, dashes, parentheses
  const cleaned = rawPhone.replace(/[\s\-()]/g, '');
  // Matches +8801[3-9]XXXXXXXX, 8801[3-9]XXXXXXXX, or 01[3-9]XXXXXXXX (11 digits local)
  const bdRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  return bdRegex.test(cleaned);
}

/**
 * Normalizes phone number into clean WhatsApp/tel international format without '+'
 * e.g. "01712345678" -> "8801712345678"
 */
export function normalizePhoneForWhatsApp(rawPhone) {
  if (!rawPhone) return '';
  const cleaned = rawPhone.replace(/[\s\-()+]/g, '');
  if (cleaned.startsWith('01')) {
    return '88' + cleaned;
  }
  if (cleaned.startsWith('8801')) {
    return cleaned;
  }
  return cleaned;
}

/**
 * Checks if a date string is today or in the future
 */
export function isValidAppointmentDate(dateStr) {
  if (!dateStr) return false;
  const selected = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today;
}
