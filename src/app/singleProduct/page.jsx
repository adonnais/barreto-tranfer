"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Acceso al token de Dropbox
const DROPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_DROPBOX_ACCESS_TOKEN;

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
  if (!url || typeof url !== "string") return "";
  return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
};

const fetchDropboxImages = async (folderPath) => {
  try {
    if (!folderPath || typeof folderPath !== "string") {
      console.error("Error: `folderPath` no es válido:", folderPath);
      return [];
    }

    console.log("Obteniendo imágenes de Dropbox en:", folderPath);

    const response = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: folderPath }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error en Dropbox API:", errorText);
      throw new Error(`Error en la API de Dropbox: ${errorText}`);
    }

    const data = await response.json();
    console.log("Respuesta de Dropbox:", data);

    const imageFiles = data.entries?.filter(
      (file) => file[".tag"] === "file" && /\.(jpg|jpeg|png|gif)$/i.test(file.name)
    ) || [];

    const imageLinks = await Promise.all(
      imageFiles.map(async (file) => {
        try {
          const tempLinkResponse = await fetch("https://api.dropboxapi.com/2/files/get_temporary_link", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ path: file.path_lower }),
          });

          if (!tempLinkResponse.ok) {
            console.error(`Error obteniendo enlace para ${file.name}`);
            return null;
          }

          const tempLinkData = await tempLinkResponse.json();
          return tempLinkData.link;
        } catch (error) {
          console.error("Error obteniendo enlace temporal:", error);
          return null;
        }
      })
    );

    return imageLinks.filter((link) => link !== null);
  } catch (error) {
    console.error("Error al obtener imágenes de Dropbox:", error);
    return [];
  }
};

const SingleProduct = () => {
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
          console.log("Cargando imágenes de la carpeta:", foundProduct.todasFotos);
          const images = await fetchDropboxImages(foundProduct.todasFotos);
          setGalleryImages(images);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [idProducto]);

  const formatDescription = (text) => {
    if (!text) return "";
    return text.split(". ").map((sentence, index) => (
      <p key={index} className="text-gray-600 mt-2">{sentence}.</p>
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
      <h1 className="text-2xl font-bold">Detalle del Producto</h1>

      {loading ? (
        <p className="text-gray-500 mt-2">Cargando...</p>
      ) : product ? (
        <div className="mt-4 p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{product.nombre}</h2>

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
                <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-lg">
                  <p className="text-gray-500">Imagen no disponible</p>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {galleryImages.length > 0 ? (
                  galleryImages.map((foto, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(foto)}
                      className="border-2 border-transparent hover:border-blue-500 p-1 rounded-lg transition"
                    >
                      <Image
                        src={foto}
                        width={100}
                        height={100}
                        alt={`Vista ${index + 1}`}
                        className="rounded-md object-cover w-24 h-24"
                        unoptimized
                      />
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">No hay imágenes adicionales</p>
                )}
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              {formatDescription(product.descripcion)}
              <button
                onClick={handleWhatsApp}
                className="mt-4 px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition flex items-center gap-2"
              >
                📲 Consultar por WhatsApp
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

export default SingleProduct;
