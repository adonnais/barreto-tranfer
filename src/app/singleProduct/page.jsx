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

// Función para capitalizar oraciones
const capitalizeSentences = (text) => {
  return text
    .toLowerCase()
    .split(". ")
    .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
    .join(". ");
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
         // console.log("Cargando imágenes desde la cadena:", foundProduct.todasFotos);

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
    return capitalizeSentences(text).split(". ").map((sentence, index) => (
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
            <div className="w-full lg:w-1/2">
              {formatDescription(product.descripcion)}
              <button
                onClick={handleWhatsApp}
                className="mt-6 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-full flex items-center gap-3 shadow-lg hover:bg-green-600 dark:hover:bg-green-400 transition-all duration-300 transform hover:scale-105"
              >
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
