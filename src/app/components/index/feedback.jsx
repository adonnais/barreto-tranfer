"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Feedback = () => {
  const [socialLinks, setSocialLinks] = useState([]);

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
    <div className="w-full max-w-4xl mx-auto my-6 p-4">
      <h2 className="text-lg font-bold text-cyan-800 uppercase mb-4 text-center">
        Síguenos en Redes Sociales
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-3 transition-transform hover:scale-105 hover:bg-gray-100"
          >
            <Image
              src={social.image}
              alt={social.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <span className="mt-2 text-sm font-medium text-gray-700">
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
