"use client";
import dynamic from "next/dynamic";
import React from "react";

// Cargar ReactPlayer dinámicamente solo en el cliente
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Video = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center border-b-2">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=3JZ_D3ELwOQ"
        width="100%"
        height="80%"
        playing={true}  // Autoplay activado
        controls={false} // Sin controles
        loop={true}      // Se repite automáticamente
        muted={true}     // Silenciado para que funcione autoplay
      />
    </div>
  );
};

export default Video;
