import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "fr",
  lng: "fr",
  resources: {
    fr: {
      translations: require("./locales/fr/fr.json"),
    },
    en: {
      translations: require("./locales/en/en.json"),
    },
    de: {
      translations: require("./locales/de/de.json"),
    },
    it: {
      translations: require("./locales/it/it.json"),
    },
    es: {
      translations: require("./locales/es/es.json"),
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["fr", "en", "de", "it", "es"];

export default i18n;
