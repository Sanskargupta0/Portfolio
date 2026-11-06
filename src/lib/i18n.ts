import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common from "~/locales/en/common.json";
import blog from "~/locales/en/blog.json";

i18n.use(initReactI18next).init({
  resources: { en: { common, blog } },
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en"],
  interpolation: { escapeValue: false },
  ns: ["common", "blog"],
  defaultNS: "common",
});

export default i18n;
