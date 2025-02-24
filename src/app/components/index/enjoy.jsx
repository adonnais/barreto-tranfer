import GalleryEnjoy from "./galleryEnjoy";
import GalleryTours from "./galleryTours"

const Enjoy = ({items}) =>{

console.log(items,"resultados enjoy")

const enjoy=items.enjoCyartagena;
const favorites=items.favoriteTours
const product= items.productos
console.log("enjoy:",enjoy,"productos",product);

const getProductsInEnjoy = (enjoy = [], products = []) => {
  if (!Array.isArray(enjoy) || !Array.isArray(products)) {
    console.error("Los datos de entrada no son arrays válidos.");
    return [];
  }
  const enjoyProductIds = new Set(enjoy.map(e => String(e.idProduct)));
  return products.filter(p => enjoyProductIds.has(String(p.id)));
};
const productsInEnjoy = getProductsInEnjoy(items.enjoCyartagena, items.productos);
console.log("Productos que están en enjoy:", productsInEnjoy)

const getProductsInFavorites = (favorites = [], products = []) => {
  if (!Array.isArray(favorites) || !Array.isArray(products)) {
    console.error("Los datos de entrada no son arrays válidos.");
    return [];
  }
  const FavoritesProductIds = new Set(favorites.map(f => String(f.idProduct)));
  return products.filter(p => FavoritesProductIds.has(String(p.id)));
};
const productsInFavorite = getProductsInFavorites(items.favoriteTours, items.productos);
console.log("Productos que están en favoritos:", productsInFavorite)

    return(
        <>
        <div className="relative w-full sm:px-6 border-b-2 mt-2 mx-auto">
        <h1 className="text-md font-bold text-cyan-800 uppercase text-start p-2">Descubre en Cartagena</h1>
        <div className="mx-auto justify-items-center w-full">
            <GalleryEnjoy cards={productsInEnjoy}/>
        </div>
        </div>

        <div className="h-[24vh] bg-cyan-400 flex justify-center items-center my-5">
        <h1 className="text-white text-3xl font-bold">label Page</h1>
        </div>

        <div className="relative w-full sm:px-6 border-b-2 mt-4 mx-auto">
        <h1 className="text-md font-bold text-cyan-800 uppercase text-start p-2">Featured Tours </h1>
        <div className="mx-auto justify-items-center w-full">
            <GalleryTours cards={productsInFavorite}/>
        </div>

        </div>
        </>
    );
};

export default Enjoy;