"use client";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 w-full">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Contenedor del Logo + Título */}
        <div className="flex items-center gap-3 mb-4">
          <Image 
            src="/logo.png" // Asegúrate de que el logo esté en /public/logo.png
            alt="Logo"
            width={40} 
            height={40} 
          />
          <h2 className="text-2xl font-bold text-left">Quiénes Somos</h2>
        </div>
        
        {/* Descripción */}
        <div className="w-full max-w-2xl">
          <p className="text-left text-gray-300 leading-relaxed">
            Somos una empresa dedicada a hacer de tus vacaciones en Cartagena una experiencia inolvidable. 
            Nos especializamos en brindarte confort, confianza y un servicio excepcional en cada momento de tu viaje. 
            Con nosotros, disfrutarás de la mejor atención y acompañamiento para que solo te preocupes por relajarte 
            y vivir al máximo cada instante en esta hermosa ciudad.
          </p>
        </div>        
        
        {/* Copyright */}
        <p className="mt-6 text-gray-500 text-sm text-center">
          &copy; 2025 Todos los derechos reservados. 
          <a href="https://wa.me/qr/IYEDTAGSPBSLG1" className="font-bold text-cyan-100 hover:text-cyan-300 transition">
            Adonais Medrano
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
