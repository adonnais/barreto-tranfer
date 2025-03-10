import Image from "next/image";
import Link from "next/link"; // ✅ Corrección de la importación

// Función para transformar enlaces de Dropbox
const transformDropboxLink = (url) => {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return "/placeholder.jpg"; // Imagen de respaldo en caso de URL inválida
  }
  return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
};

// Función para truncar texto si es muy largo
const truncateText = (text, wordLimit = 30) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

const GalleryTours = ({ cards }) => {
  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Imagen con transformación de Dropbox */}
            <Image 
              src={transformDropboxLink(card.fotoPerfil)} 
              alt={card.nombre || "Imagen del producto"} 
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
              <Link href={`/singleProduct?idProducto=${card.id}`} >
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
                  Ver más
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryTours;
