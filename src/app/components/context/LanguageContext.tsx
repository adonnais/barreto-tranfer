"use client";

import { createContext, useContext, useState } from "react";

interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("es");

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
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
