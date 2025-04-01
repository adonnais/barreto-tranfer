"use client";

import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  

  const handleTranslate = (lang: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className={`w-full h-[5px] flex justify-end items-center px-4 py-2`}>
      <button
        className="px-4 py-2 text-white rounded shadow-lg hover:bg-blue-800 transition-all"
        onClick={() => handleTranslate("en")}
      >
        🇺🇸 EN
      </button>
    </div>
  );
}
