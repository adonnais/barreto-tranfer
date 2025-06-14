"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

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

const transformDropboxLink = (url) => {
  if (!url || typeof url !== "string" || url.trim() === "") return "/placeholder.jpg";
  return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
};

const capitalizeSentences = (text) => {
  return text
    .toLowerCase()
    .split(". ")
    .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
    .join(". ");
};

const SingleProductContent = () => {
  const searchParams = useSearchParams();
  const idProducto = searchParams.get("idProducto")?.trim() || null;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [idioma, setIdioma] = useState("ES");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [drag, setDrag] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const lang = localStorage.getItem("language") || "ES";
    setIdioma(lang);
  }, []);

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
    return capitalizeSentences(text).split(". " || "." ).map((sentence, index) => (
      <p key={index} className="text-gray-600 text-md font-bold dark:text-gray-400 mt-2">
        {sentence}.
      </p>
    ));
  };

  const handleWhatsApp = () => {
    if (!product) return;
    const nombre = product[`nombre_${idioma}`] || product.nombre || "producto";
    const message = encodeURIComponent(`Hola, estoy interesado en el producto: ${nombre}`);
    const phoneNumber = "+573005121339";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));

  return (
    <div className="pt-[8%] lg:px-4">
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 mt-2">Cargando...</p>
      ) : product ? (
        <div className="mt-4 p-4 border shadow-md bg-white dark:bg-gray-900 dark:border-gray-700">
          <h1 className="text-2xl font-bold dark:text-white capitalize">
            {product[`nombre_${idioma}`] || product.nombre || "Sin nombre"}
          </h1>

          <div className="flex flex-col md:flex-col lg:flex-row gap-6 mt-4">
            <div className="w-full lg:w-1/2 flex flex-col items-center">
              {mainImage ? (
                <button onClick={() => setIsModalOpen(true)} className="w-full">
                  <div className="w-full h-[400px] relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={mainImage}
                      alt={product[`nombre_${idioma}`] || product.nombre || "Imagen del producto"}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </button>
              ) : (
                <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">Imagen no disponible</p>
                </div>
              )}

              {/* Galería horizontal */}
              <div className="relative w-full">
                <div className="flex gap-2 mt-4 overflow-x-scroll">
                  {galleryImages.length > 0 ? (
                    <div className="flex flex-nowrap">
                      {galleryImages.map((foto, index) => (
                        <button
                          key={index}
                          onClick={() => setMainImage(foto)}
                          className="border-2 border-transparent hover:border-blue-500 rounded-lg transition flex-none"
                        >
                          <Image
                            src={foto}
                            width={100}
                            height={100}
                            alt={`Vista del producto - imagen ${index + 1}`}
                            className="rounded-md object-cover w-[100px] h-[100px]"
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

            <div className="w-full lg:w-1/2 p-2">
              {formatDescription(product[`descripcion_${idioma}`] || product.descripcion)}

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

      {/* MODAL */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center">
    {/* Botones de zoom y cerrar */}
    <div className="flex gap-4 z-50 mb-4 absolute top-6">
      <button onClick={handleZoomOut} className="px-4 py-2 text-white rounded-full font-bold shadow-lg text-xxlg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
</svg>

      </button>
      <button onClick={handleZoomIn} className="px-4 py-2  text-white rounded-full font-bold shadow-lg text-xxlg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>

      </button>
      <button
        onClick={() => {
          setIsModalOpen(false);
          setZoom(1);
          setDrag({ x: 0, y: 0 });
        }}
        className="px-4 py-2  text-white rounded-full font-bold shadow"
      >
        ✕
      </button>
    </div>

    {/* Imagen con drag y zoom */}
    <div
      className="flex-1 w-full flex items-center justify-center cursor-move"
      onMouseDown={(e) => {
        e.preventDefault();
        let startX = e.clientX;
        let startY = e.clientY;
        const sensitivity = 1;

        const handleMouseMove = (eMove) => {
          const deltaX = (eMove.clientX - startX) * sensitivity;
          const deltaY = (eMove.clientY - startY) * sensitivity;

          setDrag((prev) => ({
            x: prev.x + deltaX,
            y: prev.y + deltaY,
          }));

          startX = eMove.clientX;
          startY = eMove.clientY;
        };

        const handleMouseUp = () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }}
    >
      <div
        className="relative"
        style={{
          transform: `translate(${drag.x}px, ${drag.y}px) scale(${zoom})`,
          transition: "transform 0.1s",
        }}
      >
        <Image
          src={mainImage}
          width={1000}
          height={1000}
          alt="Vista ampliada"
          className="rounded-lg object-contain max-h-[80vh]"
          unoptimized
        />
      </div>
    </div>

    {/* Galería miniaturas */}
    <div className="flex gap-2 overflow-x-auto p-2 max-w-full bg-black/30 rounded-xl z-50 mt-4 mb-6">
      {galleryImages.map((foto, index) => (
        <button
          key={index}
          onClick={() => {
            setMainImage(foto);
            setZoom(1);
            setDrag({ x: 0, y: 0 });
          }}
          className="border-2 border-transparent hover:border-blue-500 p-1 rounded-lg transition"
        >
          <Image
            src={foto}
            width={70}
            height={70}
            alt={`Miniatura ${index + 1}`}
            className="rounded-md object-cover w-[70px] h-[70px]"
            unoptimized
          />
        </button>
      ))}
    </div>
  </div>
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
