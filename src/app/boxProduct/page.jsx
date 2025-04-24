"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Diccionario de traducciones
const textos = {
  ES: {
    verMas: "Ver más",
    cajaProductos: "Caja de productos",
    mostrandoCategoria: "Mostrando productos de la categoría:",
    sinProductos: "No hay productos disponibles.",
    cargando: "Cargando productos...",
  },
  EN: {
    verMas: "See more",
    cajaProductos: "Product Box",
    mostrandoCategoria: "Showing products from category:",
    sinProductos: "No products available.",
    cargando: "Loading products...",
  },
};

const BoxProductContent = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idioma, setIdioma] = useState("ES");

  const t = textos[idioma] || textos.ES;

  useEffect(() => {
    const lang = localStorage.getItem("language") || "ES";
    setIdioma(lang.toUpperCase());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/barreto-tranfer.json");
        if (!response.ok) throw new Error("Error al cargar el archivo JSON");

        const jsonData = await response.json();

        const filteredProducts =
          category === "All"
            ? jsonData.productos
            : jsonData.productos.filter((p) => p.categoria === category);

        const sortedProducts = filteredProducts.sort((a, b) => a.order - b.order);

        setProducts(sortedProducts);
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

  const transformDropboxLink = (url) => {
    if (!url || typeof url !== "string") return "/placeholder.jpg";
    return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
  };

  return (
    <div className="lg:pt-[10%] pt-[15%] px-6">
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">{t.cajaProductos}</h1>
      <p className="text-lg text-gray-900 dark:text-gray-300 mt-2 text-center">
        {t.mostrandoCategoria}{" "}
        <span className="font-semibold text-gray-900 dark:text-white">{category}</span>
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {products.map((card, index) => (
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
          ))}
        </div>
      ) : (
        <p className="text-red-500 text-center mt-4">{t.sinProductos}</p>
      )}
    </div>
  );
};

const BoxProduct = () => {
  return (
    <Suspense fallback={<p className="text-gray-600 dark:text-gray-300 mt-4">{textos.ES.cargando}</p>}>
      <BoxProductContent />
    </Suspense>
  );
};

export default BoxProduct;
