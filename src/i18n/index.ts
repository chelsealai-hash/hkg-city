import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import zhHKTranslations from './locales/zh-HK.json';
import zhCNTranslations from './locales/zh-CN.json';
import jaTranslations from './locales/ja.json';
import koTranslations from './locales/ko.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import esTranslations from './locales/es.json';
import ptTranslations from './locales/pt.json';
import thTranslations from './locales/th.json';

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'zh-HK', name: '繁體中文', nativeName: '繁體中文', flag: '🇭🇰' },
  { code: 'zh-CN', name: '简体中文', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'th', name: 'ไทย', nativeName: 'ไทย', flag: '🇹🇭' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

const resources = {
  en: { translation: enTranslations },
  'zh-HK': { translation: zhHKTranslations },
  'zh-CN': { translation: zhCNTranslations },
  ja: { translation: jaTranslations },
  ko: { translation: koTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  es: { translation: esTranslations },
  pt: { translation: ptTranslations },
  th: { translation: thTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
