// LanguageContext.js
import React, { createContext, useContext, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en"); // default English

  // t("key") -> current language word. Missing key -> English fallback -> key
  const t = (key) =>
    (translations[lang] && translations[lang][key]) ||
    translations.en[key] ||
    key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
