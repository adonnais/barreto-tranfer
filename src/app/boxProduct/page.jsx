"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const BoxProduct = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/barreto-tranfer.json");
        if (!response.ok) throw new Error("Error al cargar el archivo JSON");

        const jsonData = await response.json();
        console.log("Datos a buscar:", jsonData.productos, "Categoría:", category);

        const filteredProducts = jsonData.productos.filter((p) => p.categoria === category);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Hubo un problema con la petición Fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const truncateText = (text, wordLimit = 30) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  // Función para transformar enlaces de Dropbox
  const transformDropboxLink = (url) => {
    if (!url || typeof url !== "string") return "/placeholder.jpg"; // Imagen de respaldo
    return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
  };

  return (
    <div className="lg:pt-[10%] pt-[15%] px-6">
      <h1 className="text-2xl font-bold text-center">Caja de productos</h1>
      <p className="text-lg text-gray-700 mt-2 text-center">
        Mostrando productos de la categoría:{" "}
        <span className="font-semibold text-cyan-600">{category}</span>
      </p>

      {loading ? (
        // 🔄 Loader animado
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {products.map((card, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Imagen con transformación de Dropbox */}
              <Image 
                src={transformDropboxLink(card.fotoPerfil)} 
                alt={card.nombre} 
                width={300} 
                height={200} 
                className="w-full h-48 object-cover rounded-t-lg"
                unoptimized
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold">{card.nombre}</h2>
                <p className="text-gray-600 text-sm text-start lowercase">
                  {truncateText(card.descripcion, 30)}
                </p>
                <Link href={`/singleProduct?idProducto=${card.id}`}>
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
                    Ver más
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default BoxProduct;
