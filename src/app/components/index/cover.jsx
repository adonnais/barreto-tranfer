'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState, useEffect } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);

  const transformDropboxLink = (url) => {
    if (!url || typeof url !== "string") return "";
    return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/barreto-tranfer.json');
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        const jsonData = await response.json();
        
        // Asegurarse de que covers es un array y transformar sus URLs
        if (Array.isArray(jsonData.covers)) {
          const transformedImages = jsonData.covers.map((item) => ({
            id: item.id,
            foto: transformDropboxLink(item.foto)
          }));
          setImages(transformedImages);
        }
        
      } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto pt-10 lg:pt-0 ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 8000 }}
        loop
        className="shadow-lg"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.foto} alt={`Slide ${image.id}`} className="w-full h-full lg:h-[50%] object-cover bg-cyan-500" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
