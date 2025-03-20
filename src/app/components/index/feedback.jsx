"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Feedback = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Detectar el tema del navegador
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      setTheme(darkModeQuery.matches ? "dark" : "light");
    };

    updateTheme(); // Aplicar el tema en la carga
    darkModeQuery.addEventListener("change", updateTheme);

    return () => {
      darkModeQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/barreto-tranfer.json");
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const jsonData = await response.json();
        setSocialLinks(jsonData.redes || []);
      } catch (error) {
        console.error("Hubo un problema con la petición Fetch:", error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div className={`w-full max-w-4xl mx-auto my-6 p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className={`text-lg font-bold uppercase mb-4 text-center ${theme === "dark" ? "text-cyan-300" : "text-cyan-800"}`}>
        Síguenos en Redes Sociales
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center shadow-md rounded-lg p-3 transition-transform hover:scale-105 
              ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"}`}
          >
            <div className="relative w-[50px] h-[50px]">
              <Image
                src={social.image}
                alt={social.name}
                fill
                className="rounded-full object-contain"
              />
            </div>

            <span className={`mt-2 text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
