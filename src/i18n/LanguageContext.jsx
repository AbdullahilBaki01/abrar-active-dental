import React, { createContext, useContext, useState, useEffect } from 'react';
import en from './en.json';
import bn from './bn.json';

const translations = { en, bn };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('abrar_dental_lang');
      if (saved === 'en' || saved === 'bn') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('abrar_dental_lang', language);
    } catch {
      // ignore
    }
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  /**
   * Helper to retrieve nested translation keys, e.g. t('hero.titlePrefix')
   */
  const t = (keyPath, fallback = '') => {
    const keys = keyPath.split('.');
    let current = translations[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Try English fallback
        let fallbackVal = translations.en;
        for (const fbKey of keys) {
          if (fallbackVal && fallbackVal[fbKey] !== undefined) {
            fallbackVal = fallbackVal[fbKey];
          } else {
            return fallback || keyPath;
          }
        }
        return fallbackVal;
      }
    }
    return current;
  };

  const isBn = language === 'bn';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isBn,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
