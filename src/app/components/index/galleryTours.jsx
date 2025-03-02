const GalleryTours = ({ cards }) => {
  const truncateText = (text, wordLimit = 30) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <img 
              src={card.image} 
              alt={card.nombre} 
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold">{card.nombre}</h2>
              <p className="text-gray-600 text-sm text-start lowercase">
                {truncateText(card.descripcion, 30)}
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition">
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryTours;
