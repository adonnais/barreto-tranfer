import GalleryEnjoy from "./galleryEnjoy";
import GalleryTours from "./galleryTours";
import Link from "next/link";

const Enjoy = ({ items }) => {
  if (!items) {
    console.error("No se recibieron datos válidos en items.");
    return null;
  }

  const enjoy = items.enjoyCartagena || [];
  const favorites = items.favoriteTours || [];
  const products = items.productos || [];

  const getProductsInEnjoy = (enjoy = [], products = []) => {
    if (!Array.isArray(enjoy) || !Array.isArray(products)) {
      console.error("Los datos de entrada no son arrays válidos.");
      return [];
    }
    const enjoyProductIds = new Set(enjoy.map((e) => String(e.idProduct)));
    return products.filter((p) => enjoyProductIds.has(String(p.id)));
  };

  const getProductsInFavorites = (favorites = [], products = []) => {
    if (!Array.isArray(favorites) || !Array.isArray(products)) {
      console.error("Los datos de entrada no son arrays válidos.");
      return [];
    }
    const favoritesProductIds = new Set(favorites.map((f) => String(f.idProduct)));
    return products.filter((p) => favoritesProductIds.has(String(p.id)));
  };

  const productsInEnjoy = getProductsInEnjoy(enjoy, products);
  const productsInFavorite = getProductsInFavorites(favorites, products);

  return (
    <>
      {/* Sección: Descubre en Cartagena */}
      <div className="relative w-full sm:px-6 border-b-2 mt-2 mx-auto">
        <h1 className="text-md font-bold text-cyan-800 dark:text-cyan-400 uppercase text-start p-2">
          Descubre en Cartagena
        </h1>
        <div className="mx-auto justify-items-start w-full">
          <GalleryEnjoy cards={productsInEnjoy} />
        </div>
      </div>

      {/* Sección: Viaja con Barreto Transfer */}
      <div className="relative flex flex-col justify-center items-center my-5 p-10 space-y-5 rounded-lg shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 dark:from-gray-800 dark:via-gray-900 dark:to-black animate-gradient"></div>

        <div className="relative z-10 text-center space-y-5">
        <h1 className="text-white text-3xl font-bold font-[Segoe Script]">
          Descubre la comodidad y seguridad de viajar con{" "}
          <span className="text-yellow-300 z-10">Barretto Transfer</span>.  
          Disfruta de nuestros vehículos para tus excursiones y recorridos, dentro y fuera de la ciudad.  
          ¡Viaja con confianza, confort y el mejor servicio! 🚐✨
        </h1>


          <Link href="/boxProduct?category=Transporte">
            <p className="p-3 text-lg rounded-full z-10 bg-yellow-400 text-blue-600 hover:bg-white hover:text-yellow-400 hover:font-bold shadow-lg transition-all duration-300 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-white dark:hover:text-yellow-600 animate-bounce cursor-pointer mt-5 font-segoe">
              Solo da click aquí
            </p>
          </Link>
        </div>
      </div>

      {/* Sección: Tours Favoritos */}
      <div className="relative w-full sm:px-6 border-b-2 mt-4 mx-auto">
        <h1 className="text-md font-bold text-cyan-800 dark:text-cyan-400 uppercase text-start p-2">
          Tours Favoritos
        </h1>
        <div className="mx-auto justify-items-center w-full">
          <GalleryTours cards={productsInFavorite} />
        </div>
      </div>
    </>
  );
};

export default Enjoy;
