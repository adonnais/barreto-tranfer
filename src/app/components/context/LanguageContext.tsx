"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextType {
  language: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>("es");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      translatePage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    translatePage(lang);
  };

  const translatePage = (lang: string) => {
    document.documentElement.lang = lang;

    if (typeof window !== "undefined") {
      if (!document.getElementById("google-translate-script")) {
        const googleTranslateScript = document.createElement("script");
        googleTranslateScript.id = "google-translate-script";
        googleTranslateScript.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
        googleTranslateScript.async = true;
        document.body.appendChild(googleTranslateScript);
      }

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "es",
            includedLanguages: "en,es",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
      <div id="google_translate_element" className="hidden"></div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }
  return context;
}
