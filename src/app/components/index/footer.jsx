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
        <div className=" text-center md:text-left">
          <h2 className="text-3xl font-extrabold mb-4 text-blue-400 uppercase">Quiénes Somos</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Somos una empresa que facilita tus necesidades en tus vacaciones en Cartagena. Brindándote la mejor experiencia, confort y confianza en cada paso que das con nosotros..
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
