import GalleryEnjoy from "./galleryEnjoy";
import GalleryTours from "./galleryTours"

const Enjoy = () =>{

    const cards = [
        {
          title: "Montañas",
          image: "https://via.placeholder.com/300",
          description: "Un hermoso paisaje de montañas al amanecer.",
        },
        {
          title: "Playa",
          image: "https://via.placeholder.com/300",
          description: "Arena dorada y aguas cristalinas bajo el sol.",
        },
        {
          title: "Bosque",
          image: "https://via.placeholder.com/300",
          description: "Un bosque verde y frondoso lleno de vida silvestre.",
        },
        {
          title: "Desierto",
          image: "https://via.placeholder.com/300",
          description: "Dunas de arena y un cielo infinito.",
        },
      ];

      const tours = [

              {
                title: "Tour por el Centro Histórico",
                image: "https://via.placeholder.com/300",
                description: "Descubre la historia colonial de Cartagena en un recorrido guiado.",
              },
              {
                title: "Islas del Rosario",
                image: "https://via.placeholder.com/300",
                description: "Disfruta de playas paradisíacas y aguas cristalinas en este tour en lancha.",
              },
              {
                title: "Castillo de San Felipe",
                image: "https://via.placeholder.com/300",
                description: "Explora la fortaleza más grande construida por los españoles en Sudamérica.",
              },
              {
                title: "Chiva Rumbera Nocturna",
                image: "https://via.placeholder.com/300",
                description: "Vive la fiesta cartagenera con música, baile y bebidas típicas.",
              },
              {
                title: "Tour en Barco por la Bahía",
                image: "https://via.placeholder.com/300",
                description: "Disfruta de un paseo en barco al atardecer con vistas espectaculares.",
              },
              {
                title: "Aventura en Playa Blanca",
                image: "https://via.placeholder.com/300",
                description: "Relájate en las aguas cristalinas de Playa Blanca en Barú.",
              },
              {
                title: "Ruta Gastronómica",
                image: "https://via.placeholder.com/300",
                description: "Prueba los mejores platos típicos en un recorrido gastronómico.",
              },
              {
                title: "Excursión a la Totumo",
                image: "https://via.placeholder.com/300",
                description: "Sumérgete en el volcán de lodo Totumo, una experiencia única.",
              },
      ];
    return(
        <>
        <div className="relative w-full sm:px-6 border-b-2 mt-2 mx-auto">
        <h1 className="text-md font-bold text-cyan-800 uppercase text-start p-2">Enojy Cartagena</h1>
        <div className="mx-auto justify-items-center w-full">
            <GalleryEnjoy cards={cards}/>
        </div>
        </div>

        <div className="h-[24vh] bg-cyan-400 flex justify-center items-center my-5">
        <h1 className="text-white text-3xl font-bold">label Page</h1>
        </div>

        <div className="relative w-full sm:px-6 border-b-2 mt-4 mx-auto">
        <h1 className="text-md font-bold text-cyan-800 uppercase text-start p-2">Featured Tours </h1>
        <div className="mx-auto justify-items-center w-full">
            <GalleryTours tours={tours}/>
        </div>

        </div>
        </>
    );
};

export default Enjoy;