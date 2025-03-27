"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

const truncateText = (text, length) => (text.length > length ? text.substring(0, length) + "..." : text);

const transformDropboxLink = (url) => {
  if (!url || typeof url !== "string") return "/placeholder.jpg"; // Imagen de respaldo
  return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
};

const ResultadosContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [imageLoading, setImageLoading] = useState({}); // Estado para cada imagen

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("/barreto-tranfer.json");
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();
        setProductos(data.productos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const filteredProductos = useMemo(() => {
    return productos.filter(
      (p) => p.nombre.toLowerCase().includes(query) || p.descripcion.toLowerCase().includes(query)
    );
  }, [productos, query]);

  if (loading) return <p className="text-gray-600 mt-4">Cargando productos...</p>;
  if (error) return <p className="text-red-600 mt-4">Error: {error}</p>;

  return (
    <div className="pt-[10%] px-6 lg:px-14">
      <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
      <p className="text-gray-600 mt-2">
        Mostrando resultados para: <span className="font-semibold">"{query}"</span>
      </p>

      {filteredProductos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredProductos.map((card) => {
            const imageUrl = transformDropboxLink(card.fotoPerfil);

            return (
              <div
                key={card.id}
                className={`shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <div className="relative w-full h-48">
                  {imageLoading[card.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500"></div>
                    </div>
                  )}

                  <Image
                    src={imageUrl}
                    alt={card.nombre}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                    unoptimized
                    onLoad={() => setImageLoading((prev) => ({ ...prev, [card.id]: false }))}
                    onError={() => setImageLoading((prev) => ({ ...prev, [card.id]: false }))}
                    onLoadingComplete={() => setImageLoading((prev) => ({ ...prev, [card.id]: false }))}
                  />
                </div>

                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold uppercase">{card.nombre}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm text-start lowercase">
                    {truncateText(card.descripcion, 30)}
                  </p>
                  <Link href={`/singleProduct?idProducto=${card.id}`}>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
                      Ver más
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No se encontraron productos.</p>
      )}
    </div>
  );
};

const Resultados = () => {
  return (
    <Suspense fallback={<p className="text-gray-600 mt-4">Cargando búsqueda...</p>}>
      <ResultadosContent />
    </Suspense>
  );
};

export default Resultados;
