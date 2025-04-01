"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button
        className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-800 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => changeLanguage(language === "en" ? "es" : "en")}
      >
        {language === "en" ? "🇪🇸 ES" : "🇺🇸 EN"}
      </button>
    </div>
  );
}
