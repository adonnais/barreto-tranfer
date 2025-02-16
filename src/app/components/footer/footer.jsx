"use client";
import React from "react";


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
     
        <h2 className="text-2xl font-bold mb-4 text-center">¡Suscríbete para más novedades!</h2>
        <div className="flex flex-col sm:flex-row w-full max-w-md gap-2">
          <input
            type="email"
            placeholder="Ingresa tu correo..."
            className="flex-1 p-3 rounded-lg text-gray-800 focus:outline-none"
          />
          <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-lg">
            Suscribirse
          </button>
        </div>

        <div className="flex gap-6 mt-6">
          <a href="#" className="text-gray-400 hover:text-blue-500 transition text-2xl">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd"/>
            </svg>
          </a>  
          <a href="#" className="text-gray-400 hover:text-pink-500 transition text-2xl">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
            </svg>

          </a>
        </div>

        
        <p className="mt-6 text-gray-500 text-sm">&copy; 2024 Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
