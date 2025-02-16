const GalleryTours = ({tours}) => {
    
  
    return (
        <div className="w-full flex justify-center py-6">
        <div className="w-full  px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tours.map((tour, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-bold">{tour.title}</h2>
                  <p className="text-gray-600 text-sm">{tour.description}</p>
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
  
  export default GalleryTours;
  