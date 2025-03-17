import ar from '@/translations/ar.json';
import en from '@/translations/en.json';
import te from '@/translations/te.json';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  te: {
    translation: te,
  },
};

export type Language = keyof typeof resources;
