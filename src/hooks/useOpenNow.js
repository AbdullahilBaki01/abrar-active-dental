import { useState, useEffect } from 'react';
import { clinicData } from '../data/clinic';

/**
 * Hook to calculate whether clinic is currently open based on clinicData.schedule
 * Evaluates current time in Bangladesh time zone (Asia/Dhaka, UTC+6) or browser local time
 */
export function useOpenNow() {
  const [status, setStatus] = useState(() => calculateStatus());

  function calculateStatus() {
    try {
      const now = new Date();
      // Get current Bangladesh local day & time
      // Bangladesh is UTC+6
      const bdFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour12: false,
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });

      const parts = bdFormatter.formatToParts(now);
      const hourPart = parts.find((p) => p.type === 'hour')?.value || '0';
      const minutePart = parts.find((p) => p.type === 'minute')?.value || '0';
      const currentMinutes = parseInt(hourPart, 10) * 60 + parseInt(minutePart, 10);

      // Current Day of week in Dhaka
      const dhakaDateStr = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(now);
      const dhakaDate = new Date(`${dhakaDateStr}T12:00:00`);
      const currentDay = dhakaDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

      const todayConfig = clinicData.schedule.find((s) => s.day === currentDay);

      if (!todayConfig || !todayConfig.isOpen) {
        return {
          isOpen: false,
          reason: 'closed_today',
          todaySchedule: todayConfig,
          labelEn: 'Closed Today',
          labelBn: 'আজ বন্ধ',
          detailEn: 'Next consultation opens tomorrow at 5:00 PM',
          detailBn: 'পরবর্তী কনসালটেশন কাল বিকাল ৫:০০ টায়',
        };
      }

      const [openHour, openMin] = todayConfig.open.split(':').map(Number);
      const [closeHour, closeMin] = todayConfig.close.split(':').map(Number);
      const openMinutes = openHour * 60 + openMin;
      const closeMinutes = closeHour * 60 + closeMin;

      const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

      if (isOpen) {
        return {
          isOpen: true,
          todaySchedule: todayConfig,
          labelEn: 'Open Now',
          labelBn: 'এখন খোলা',
          detailEn: `Until ${formatTime12h(todayConfig.close)}`,
          detailBn: `${formatTime12hBn(todayConfig.close)} পর্যন্ত খোলা`,
        };
      } else if (currentMinutes < openMinutes) {
        return {
          isOpen: false,
          todaySchedule: todayConfig,
          labelEn: 'Closed Now',
          labelBn: 'বর্তমানে বন্ধ',
          detailEn: `Opens today at ${formatTime12h(todayConfig.open)}`,
          detailBn: `আজ ${formatTime12hBn(todayConfig.open)} খুলবে`,
        };
      } else {
        const nextDayIdx = (currentDay + 1) % 7;
        const nextDayConfig = clinicData.schedule.find((s) => s.day === nextDayIdx);
        const nextOpenTimeEn = nextDayConfig?.open ? formatTime12h(nextDayConfig.open) : '5:00 PM';
        const nextOpenTimeBn = nextDayConfig?.open ? formatTime12hBn(nextDayConfig.open) : 'বিকাল ৫:০০ টায়';
        return {
          isOpen: false,
          todaySchedule: todayConfig,
          labelEn: 'Closed Now',
          labelBn: 'বর্তমানে বন্ধ',
          detailEn: `Opens tomorrow at ${nextOpenTimeEn}`,
          detailBn: `কাল ${nextOpenTimeBn} খুলবে`,
        };
      }
    } catch {
      // Fallback
      return {
        isOpen: true,
        todaySchedule: clinicData.schedule[0],
        labelEn: 'Open 5 PM – 10 PM',
        labelBn: 'বিকাল ৫:০০ – রাত ১০:০০',
        detailEn: 'Consultation Hours',
        detailBn: 'চেম্বারের সময়',
      };
    }
  }

  useEffect(() => {
    // Check every minute
    const interval = setInterval(() => {
      setStatus(calculateStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return status;
}

function formatTime12h(time24) {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  const minuteStr = m === 0 ? '' : `:${m < 10 ? '0' + m : m}`;
  return `${hour12}${minuteStr} ${period}`;
}

function formatTime12hBn(time24) {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const periodBn = h >= 18 ? 'রাত' : h >= 15 ? 'বিকাল' : h >= 12 ? 'দুপুর' : 'সকাল';
  const hour12 = h % 12 || 12;
  const minuteStr = m === 0 ? ':০০' : `:${m < 10 ? '0' + m : m}`;
  const enToBn = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', ':': ':' };
  const bnNum = `${hour12}${minuteStr}`.replace(/[0-9:]/g, (d) => enToBn[d]);
  return `${periodBn} ${bnNum} টা`;
}
