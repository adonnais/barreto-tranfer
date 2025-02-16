"use client";
import { useSearchParams } from "next/navigation";

const BoxProduct = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "Sin categoría"; // Extrae el parámetro

  return (
    <div className="mt-14 px-14">
      <h1 className="text-2xl font-bold">Caja de productos</h1>
      <p className="text-lg text-gray-700 mt-2">
        Mostrando productos de la categoría: <span className="font-semibold text-cyan-600">{category}</span>
      </p>
    </div>
  );
};

export default BoxProduct;
