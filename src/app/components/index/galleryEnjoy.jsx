"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Función para transformar enlaces de Dropbox
const transformDropboxLink = (url) => {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return "/placeholder.jpg";
  }
  return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
};

// Función para truncar el texto si es muy largo
const truncateText = (text, wordLimit = 30) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

// Traducciones del botón
const textos = {
  ES: {
    verMas: "Ver más",
  },
  EN: {
    verMas: "See more",
  },
};

const GalleryEnjoy = ({ cards = [] }) => {
  const [idioma, setIdioma] = useState("ES");
  const [isReady, setIsReady] = useState(false); // Solo renderiza cuando esté listo

  useEffect(() => {
    const lang = localStorage.getItem("language") || "ES";
    setIdioma(lang.toUpperCase());
    setIsReady(true);
  }, []);

  if (!isReady) return null; // Espera hasta que esté listo el idioma

  const t = textos[idioma] || textos.ES;

  return (
    <div className="w-full flex justify-start">
      <div className="w-full overflow-x-auto py-4">
        <div className="flex space-x-4 px-4">
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
              >
                <Image
                  src={transformDropboxLink(card.fotoPerfil)}
                  alt={card[`nombre_${idioma}`] || "Imagen del producto"}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                  unoptimized
                />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold text-black dark:text-white capitalize">
                    {card[`nombre_${idioma}`] || "Sin nombre"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-start lowercase">
                    {truncateText(card[`descripcion_${idioma}`], 30) || "Sin descripción"}
                  </p>
                  <Link href={`/singleProduct?idProducto=${card.id}`} passHref>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white text-md rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition">
                      {t.verMas}
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center w-full">
              No hay productos disponibles
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryEnjoy;
