import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ja from "./locales/ja.json";
import zh from "./locales/zh.json";
import en from "./locales/en.json";
import ko from "./locales/ko.json";

const resources = {
  ja: { translation: ja },
  zh: { translation: zh },
  en: { translation: en },
  ko: { translation: ko },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "ja",
    fallbackLng: "ja",
    supportedLngs: ["ja", "zh", "en", "ko"],
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: "izk_language",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const languages = [
  { code: "ja", label: "日本語", flag: "JP" },
  { code: "zh", label: "中文", flag: "CN" },
  { code: "en", label: "English", flag: "US" },
  { code: "ko", label: "한국어", flag: "KR" },
] as const;

export type LangCode = (typeof languages)[number]["code"];
