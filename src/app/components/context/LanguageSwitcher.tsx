"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<"ES" | "EN">("ES");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Confirma que ya estás en el cliente
    const storedLanguage = localStorage.getItem("language") as "ES" | "EN" | null;
    if (storedLanguage) {
      setLanguage(storedLanguage);
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select) {
        select.value = storedLanguage.toLowerCase();
        select.dispatchEvent(new Event("change"));
      }
    }
  }, []);

  const handleTranslate = () => {
    const newLanguage: "ES" | "EN" = language === "ES" ? "EN" : "ES";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);

    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = newLanguage.toLowerCase();
      select.dispatchEvent(new Event("change"));
    }

    window.location.reload();
  };

  if (!isClient) return null; // 🔥 Evita el render hasta que estés en el cliente

  return (
    <div>
      <button
        className="px-4 py-2 font-bold font-roboto text-black bg-gray-200 hover:bg-gray-300 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md shadow-md transition-colors duration-300"
        onClick={handleTranslate}
      >
        {language === "ES" ? "🇺🇸 ENGLISH" : "🇪🇸 ESPAÑOL"}
      </button>
    </div>
  );
}
