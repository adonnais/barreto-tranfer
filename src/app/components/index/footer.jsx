"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Textos por idioma
const textos = {
  es: {
    titulo: "Quiénes Somos",
    descripcion:
      "Somos una empresa que facilita tus necesidades en tus vacaciones en Cartagena. Brindándote la mejor experiencia, confort y confianza en cada paso que das con nosotros..",
  },
  en: {
    titulo: "About Us",
    descripcion:
      "We are a company that makes your vacation needs in Cartagena easier. Providing you with the best experience, comfort, and trust in every step you take with us.",
  },
};

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [idioma, setIdioma] = useState("es");

  useEffect(() => {
    // Detectar tema oscuro
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }

    // Detectar idioma desde localStorage
    const lang = localStorage.getItem("language") || "ES";
    setIdioma(lang.toLowerCase());
  }, []);

  const t = textos[idioma] || textos.es;

  return (
    <footer className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} py-12 w-full`}>
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Sección de Información */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold mb-4 text-blue-400 uppercase">{t.titulo}</h2>
          <p className="leading-relaxed text-lg text-gray-300 dark:text-gray-300 text-gray-700">
            {t.descripcion}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
