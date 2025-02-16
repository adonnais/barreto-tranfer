"use client"
import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Juan Pérez",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "¡Excelente servicio! Volveré pronto.",
    rating: 5,
  },
  {
    id: 2,
    name: "María López",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "Muy buena experiencia, recomendado.",
    rating: 4,
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    description: "Podría mejorar en algunos aspectos.",
    rating: 3,
  },
  {
    id: 4,
    name: "Ana Torres",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    description: "Atención rápida y profesional.",
    rating: 5,
  },
];

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm text-center">
      <img
        src={review.image}
        alt={review.name}
        className="w-20 h-20 rounded-full mx-auto mb-3"
      />
      <h3 className="text-lg font-semibold">{review.name}</h3>
      <p className="text-gray-600 text-sm">{review.description}</p>
      <div className="flex justify-center mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
            fill={i < review.rating ? "currentColor" : "none"}
          />
        ))}
      </div>
    </div>
  );
};

const Feedback = () => {
  return (
    <div className="relative w-full px-4 sm:px-6 border-b-2 mx-auto my-4">
      <h1 className="text-md font-bold text-cyan-800 uppercase text-start p-2">Feedbacks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto justify-items-center">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Feedback;
