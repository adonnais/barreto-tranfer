import GalleryEnjoy from "./galleryEnjoy";
import GalleryTours from "./galleryTours";
import Link from "next/link"

const Enjoy = ({items}) =>{


const enjoy=items.enjoyCartagena;
const favorites=items.favoriteTours
const product= items.productos


const getProductsInEnjoy = (enjoy = [], products = []) => {
  if (!Array.isArray(enjoy) || !Array.isArray(products)) {
    console.error("Los datos de entrada no son arrays válidos.");
    return [];
  }
  const enjoyProductIds = new Set(enjoy.map(e => String(e.idProduct)));
  return products.filter(p => enjoyProductIds.has(String(p.id)));
};
const productsInEnjoy = getProductsInEnjoy(items.enjoyCartagena, items.productos);


const getProductsInFavorites = (favorites = [], products = []) => {
  if (!Array.isArray(favorites) || !Array.isArray(products)) {
    console.error("Los datos de entrada no son arrays válidos.");
    return [];
  }
  const FavoritesProductIds = new Set(favorites.map(f => String(f.idProduct)));
  return products.filter(p => FavoritesProductIds.has(String(p.id)));
};
const productsInFavorite = getProductsInFavorites(items.favoriteTours, items.productos);


    return(
        <>
        <div className="relative w-full sm:px-6 border-b-2 mt-2 mx-auto">
        <h1 className="text-md font-bold text-cyan-800 uppercase text-start p-2">Descubre en Cartagena</h1>
        <div className="mx-auto justify-items-start w-full">
            <GalleryEnjoy cards={productsInEnjoy}/>
        </div>
        </div>

        <div className="relative flex flex-col justify-center items-center my-5 p-10 space-y-5 rounded-lg shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 animate-gradient"></div>

          <div className="relative z-10 text-center space-y-5">
          <h1 className="text-white text-3xl font-bold font-segoe">
                  Descubre la comodidad y seguridad de viajar con <span className="text-yellow-300">Barreto Transfer</span>.  
                  Disfruta de nuestros vehículos para tus excursiones y recorridos, dentro y fuera de la ciudad.  
                  ¡Viaja con confianza, confort y el mejor servicio! 🚗✨
                </h1>

                <Link href="/boxProduct?category=Transporte">
                  <p className="p-3 text-lg rounded-full bg-yellow-400 text-blue-600 hover:bg-white hover:text-yellow-400 hover:font-bold shadow-lg transition-all duration-300 animate-bounce cursor-pointer mt-5 font-segoe">
                    Solo da click aquí
                  </p>
                </Link>

          </div>
        </div>

        <div className="relative w-full sm:px-6 border-b-2 mt-4 mx-auto">
        <h1 className="text-md font-bold text-cyan-800 uppercase text-start p-2">Tours Favoritos</h1>
        <div className="mx-auto justify-items-center w-full">
            <GalleryTours cards={productsInFavorite}/>
        </div>

        </div>
        </>
    );
};

export default Enjoy;