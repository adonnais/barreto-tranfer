"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "../context/LanguageSwitcher";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [idioma, setIdioma] = useState("ES");
  const router = useRouter();

  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    const lang = localStorage.getItem("language") || "ES";
    setIdioma(lang);
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/resultado?query=${encodeURIComponent(query)}`);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/barreto-tranfer.json");
        if (!response.ok) throw new Error("Error al cargar el archivo JSON");

        const jsonData = await response.json();
        setMenuItems(jsonData.categoria || []);
      } catch (error) {
        console.error("Hubo un problema con la petición Fetch:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full shadow-md z-30 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        <div className="flex items-center justify-between px-4 py-3 lg:px-8">
          <Link href="/">
            <Image src="/logo.png" height={900} width={900} alt="Logo" className="lg:h-[80px] md:h-14 h-6 w-auto" />
          </Link>

          <div>
            <LanguageSwitcher />
          </div>

          <form onSubmit={handleSearch} className="hidden lg:block w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:outline-none ${
                  isDarkMode ? "bg-gray-800 text-white border-gray-600" : "border-gray-300"
                }`}
              />
              <button type="submit" className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                🔍
              </button>
            </div>
          </form>

          <div className="lg:hidden cursor-pointer text-xl" onClick={toggleModal}>
            ☰
          </div>
        </div>

        <div className="hidden lg:flex justify-center bg-blue-600 dark:bg-gray-800 py-2 shadow-sm z-40">
          <div className="flex space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={`/boxProduct?category=${encodeURIComponent(item.nombre_ES)}`}
                className="text-white dark:text-gray-300 text-lg"
              >
                {item[`nombre_${idioma}`] || item.nombre_ES}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={`fixed inset-0 bg-opacity-50 flex justify-center items-start pt-10 z-40 ${isDarkMode ? "bg-black/80" : "bg-black/50"}`}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className={`w-full p-5 rounded-t-lg relative z-10 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
              <form onSubmit={handleSearch} className="w-full pt-10">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:outline-none ${
                      isDarkMode ? "bg-gray-800 text-white border-gray-600" : "border-gray-300"
                    }`}
                  />
                  <button type="submit" className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                    🔍
                  </button>
                </div>
              </form>

              <div className="h-[1px] my-2 bg-black"></div>

              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/boxProduct?category=${encodeURIComponent(item.nombre_ES)}`}
                    className="text-md font-light"
                    aria-label={`Ir a ${item[`nombre_${idioma}`]}`}
                    onClick={() => setIsModalOpen(false)}
                  >
                    {item[`nombre_${idioma}`] || item.nombre_ES}
                  </Link>
                ))}
              </div>

              <div className="mt-4">
                <LanguageSwitcher />
              </div>

              <button className="absolute top-3 right-3 p-2 rounded text-lg" onClick={toggleModal}>
                ✖
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
