"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<"ES" | "EN">("ES"); // Español por defecto en mayúsculas

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as "ES" | "EN" | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select) {
        select.value = storedLanguage.toLowerCase();
        select.dispatchEvent(new Event("change"));
      }
    }
  }, [])
    console.log("leguaje",language);
  const handleTranslate = () => {
    const newLanguage: "ES" | "EN" = language === "ES" ? "EN" : "ES";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);

    console.log("Idioma seleccionado:", newLanguage);

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = newLanguage.toLowerCase(); // Google Translate usa "en"/"es"
      select.dispatchEvent(new Event("change"));
    }

    window.location.reload();
  };

  return (
    <div>
      <button
        className="px-4 py-2 font-bold font-roboto text-white rounded-md shadow-md"
        onClick={handleTranslate}
      >
        {language === "ES" ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}
      </button>
    </div>
  );
}
