const GalleryEnjoy = ({cards}) => {
    const card = cards;
    const truncateText = (text, wordLimit = 30) => {
      if (!text) return "";
      
      const words = text.split(" ");
      return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
    };
    
 
    return (
        <div className="w-full flex lg:justify-center justify-start">
        <div className="w-full overflow-x-auto py-4">
          <div className="flex space-x-4 px-4 lg:justify-center justify-start">
            {card.map((card, index) => (
              <div key={index} className="min-w-[280px] bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={card.image} alt={card.nombre} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold">{card.nombre}</h2>
                  <p className="text-gray-600 text-sm text-start lowercase">{truncateText(card.descripcion, 30)}</p>
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
                    Ver más
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
   
    );
  };
  
  export default GalleryEnjoy;
  