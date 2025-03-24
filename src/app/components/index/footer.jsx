"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <footer className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} py-12 w-full`}>
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Sección de Información */}
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-extrabold mb-4 text-blue-400">Quiénes Somos</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            En <span className="text-blue-400 font-semibold">Barretto Transfer</span>, nos especializamos en convertir tus vacaciones en una aventura inolvidable.
            Te ofrecemos confort, seguridad y un servicio excepcional para que disfrutes cada instante sin preocupaciones.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
