"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Función para obtener el producto filtrado
const fetchAndFilterProduct = async (idProducto) => {
  try {
    const response = await fetch("/barreto-tranfer.json");
    if (!response.ok) throw new Error("Error al cargar el archivo JSON");

    const jsonData = await response.json();
    const numericId = idProducto ? parseInt(idProducto, 10) : null;
    return jsonData.productos.find((p) => p.id === numericId) || null;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
};

// Transformar enlaces de Dropbox
const transformDropboxLink = (url) => {
  if (!url || typeof url !== "string" || url.trim() === "") return "/placeholder.jpg";
  return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
};

const SingleProductContent = () => {
  const searchParams = useSearchParams();
  const idProducto = searchParams.get("idProducto")?.trim() || null;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!idProducto) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const foundProduct = await fetchAndFilterProduct(idProducto);

      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(transformDropboxLink(foundProduct.fotoPerfil));

        if (foundProduct.todasFotos) {
          console.log("Cargando imágenes desde la cadena:", foundProduct.todasFotos);

          const imagesArray = foundProduct.todasFotos
            .split(",")
            .map((url) => transformDropboxLink(url.trim()));

          setGalleryImages(imagesArray);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [idProducto]);

  const formatDescription = (text) => {
    if (!text) return "";
    return text.split(". ").map((sentence, index) => (
      <p key={index} className="text-gray-600 dark:text-gray-400 mt-2">{sentence}.</p>
    ));
  };

  const handleWhatsApp = () => {
    if (!product) return;
    const message = encodeURIComponent(`Hola, estoy interesado en el producto: ${product.nombre}`);
    const phoneNumber = "+573005121339";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="pt-[10%] px-6 lg:px-14">
      <h1 className="text-2xl font-bold dark:text-white">Detalle del Producto</h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 mt-2">Cargando...</p>
      ) : product ? (
        <div className="mt-4 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{product.nombre}</h2>

          <div className="flex flex-col md:flex-col lg:flex-row gap-6 mt-4">
            {/* Sección de imágenes */}
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              {mainImage ? (
                <Image
                  src={mainImage}
                  width={600}
                  height={600}
                  alt={product.nombre}
                  className="rounded-lg shadow-lg object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-60 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">Imagen no disponible</p>
                </div>
              )}

              {/* Galería de imágenes adicionales */}
              <div className="relative w-full">
                <div className="flex gap-2 mt-4 overflow-x-scroll overflow-x-hidden p-2">
                  {galleryImages.length > 0 ? (
                    <div className="flex flex-nowrap">
                      {galleryImages.map((foto, index) => (
                        <button
                          key={index}
                          onClick={() => setMainImage(foto)}
                          className="border-2 border-transparent hover:border-blue-500 p-1 rounded-lg transition flex-none"
                        >
                          <Image
                            src={foto}
                            width={150}
                            height={150}
                            alt={`Vista ${index + 1}`}
                            className="rounded-md object-cover w-[100px] h-[100px] flex-none"
                            unoptimized
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No hay imágenes adicionales</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sección de descripción y botón de WhatsApp */}
            <div className="w-full lg:w-1/2">
              {formatDescription(product.descripcion)}

              <button
                onClick={handleWhatsApp}
                className="mt-6 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-full flex items-center gap-3 shadow-lg hover:bg-green-600 dark:hover:bg-green-400 transition-all duration-300 transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width="20"
                  height="20"
                  fill="white">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 
                  480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157
                  341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 
                  82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 
                  184.6z"/>
                </svg>
                Consultar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500 mt-2">Producto no encontrado.</p>
      )}
    </div>
  );
};

const SingleProduct = () => {
  return (
    <Suspense fallback={<p className="text-gray-600 dark:text-gray-400 mt-4">Cargando producto...</p>}>
      <SingleProductContent />
    </Suspense>
  );
};

export default SingleProduct;
