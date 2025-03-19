import Link from "next/link";
import Image from "next/image";

// Función para transformar enlaces de Dropbox
const transformDropboxLink = (url) => {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return "/placeholder.jpg"; // Imagen por defecto si no hay URL válida
  }
  return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
};

// Función para truncar el texto si es muy largo
const truncateText = (text, wordLimit = 30) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

const GalleryEnjoy = ({ cards = [] }) => {
  console.log("Cards en GalleryEnjoy:", cards);

  return (
    <div className="w-full flex justify-start">
      <div className="w-full overflow-x-auto py-4">
        <div className="flex space-x-4 px-4">
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden"
              >
                {/* Imagen con transformación de Dropbox */}
                <Image
                  src={transformDropboxLink(card.fotoPerfil)}
                  alt={card.nombre || "Imagen del producto"}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                  unoptimized
                />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold text-black dark:text-white">
                    {card.nombre || "Sin nombre"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm text-start lowercase">
                    {truncateText(card.descripcion, 30) || "Sin descripción"}
                  </p>
                  <Link href={`/singleProduct?idProducto=${card.id}`} passHref>
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition">
                      Ver más
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center w-full">
              No hay productos disponibles
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryEnjoy;
