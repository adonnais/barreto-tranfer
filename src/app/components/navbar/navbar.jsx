'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [query, setQuery] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const router = useRouter(); // Inicializar el router

const handleSearch = (e) => {
  e.preventDefault();
  if (!query.trim()) return; // Evitar búsquedas vacías
  router.push(`/resultado?query=${encodeURIComponent(query)}`);
};
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/barreto-tranfer.json');
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        const jsonData = await response.json();
        setMenuItems(jsonData.categoria || []);
      } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/">
          <Image src="/logo.png" height={900} width={900} alt="Logo" className="lg:h-[80px] md:h-14 h-6 w-auto" />
        </Link>
        <form onSubmit={handleSearch} className="hidden lg:block w-1/3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button type="submit" className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m2.85-6.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
              </svg>
            </button>
          </div>
        </form>
        <div className="lg:hidden" onClick={toggleModal}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-opacity-50 flex justify-center items-start pt-14 bg-black/50" 
            initial={{ y: "-100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "-100%" }} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-white w-full p-5 rounded-t-lg relative">
              <div className="border-b pb-2 mt-10">
              <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button type="submit" className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m2.85-6.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
              </svg>
            </button>
          </div>
        </form>
              </div>
              <div className="h-[1px] my-2 bg-black"></div>
              <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.id} 
                    href={`/boxProduct?category=${encodeURIComponent(item.categoria)}`} 
                    className="text-md font-light text-black transition-transform hover:text-cyan-500 hover:scale-105 hover:uppercase hover:font-bold" 
                    aria-label={`Ir a ${item.categoria}`} 
                    onClick={() => setIsModalOpen(false)}
                  >
                    {item.categoria}
                  </Link>
                ))}
              </div>
              <button className="absolute top-3 right-3 text-black p-2 rounded" onClick={toggleModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap mx-auto w-screen px-4 items-center justify-between space-x-4 bg-blue-600 hidden lg:block">
        {menuItems.map((item) => (
          <Link 
            key={item.id} 
            href={`/boxProduct?category=${encodeURIComponent(item.categoria)}`}
            className="text-md font-light text-white items-center transition-transform hover:text-yellow-300 hover:scale-105 hover:uppercase hover:font-bold hover:bg-blue-600 hover:p-2 hover:rounded-lg"  
            aria-label={`Ir a ${item.categoria}`} 
            onClick={() => setIsModalOpen(false)}
          >
            {item.categoria}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
