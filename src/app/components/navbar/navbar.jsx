'use client'

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", query);
  };

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/barreto-tranfer.json');
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        const jsonData = await response.json();
        setMenuItems(jsonData.categoria);
      } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <nav className="fixed top-0 z-10 w-full flex flex-col items-center justify-around space-y-2 ">
      <div className="w-full flex items-center bg-white justify-around  shadow-b shadow-md  shadow-cyan-500">
        <div className="p-2 rounded-md w-full">
          <Link href="/">
            <Image src="/logo.png" height={100} width={100} alt="Logo" />
          </Link>
        </div>
        <form onSubmit={handleSearch} className="relative w-full max-w-md hidden lg:block">
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          />
          <button type="submit" className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m2.85-6.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
            </svg>
          </button>
        </form>
      </div>
      <div className=" w-full flex items-center justify-center">
      <div className="hidden lg:flex items-center space-x-5 w-full justify-center">
        {menuItems.map((item) => (
          <Link key={item.id} href={`/boxProduct?category=${encodeURIComponent(item.categoria)}`} className="text-md font-light text-black transition-transform hover:text-cyan-500 hover:scale-105 hover:uppercase hover:font-bold" aria-label={`Ir a ${item.categoria}`}>{item.categoria}</Link>
        ))}
      </div>
      </div>
        <div className="lg:hidden flex items-center" onClick={toggleModal}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              className="fixed inset-0 bg-opacity-50 flex justify-center items-start pt-14" 
              initial={{ y: "-100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "-100%" }} 
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-white w-full p-5 rounded-t-lg relative">
                <div className="border-b pb-2 mt-10">
                  <form onSubmit={handleSearch} className="relative w-full max-w-md">
                    <input 
                      type="text" 
                      placeholder="Buscar..." 
                      value={query} 
                      onChange={(e) => setQuery(e.target.value)} 
                      className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    />
                    <button type="submit" className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m2.85-6.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                      </svg>
                    </button>
                  </form>
                </div>
                <div className="h-[1px] my-2 bg-black"></div>
                <div className="flex flex-col space-y-2">
                  {menuItems.map((item) => (
                    <Link key={item.id} href={`/boxProduct?category=${encodeURIComponent(item.categoria)}`} className="text-md font-light text-black transition-transform hover:text-cyan-500 hover:scale-105 hover:uppercase hover:font-bold" aria-label={`Ir a ${item.categoria}`} onClick={() => setIsModalOpen(false)}>{item.categoria}</Link>
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
    </nav>
  );
};

export default Navbar;
