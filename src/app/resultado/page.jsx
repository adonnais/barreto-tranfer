"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const fetchProductos = async () => {
  const response = await fetch("/barreto-tranfer.json");
  if (!response.ok) throw new Error("Error al cargar productos");
  return response.json();
};

const Resultados = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const data = await fetchProductos();
        setProductos(data.productos);

        const filtered = data.productos.filter(
          (p) =>
            p.nombre.toLowerCase().includes(query) ||
            p.descripcion.toLowerCase().includes(query)
        );

        setFilteredProductos(filtered);
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      }
    };

    getProductos();
  }, [query]);

  return (
    <div className="pt-[10%] px-6 lg:px-14">
      <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
      <p className="text-gray-600 mt-2">
        Mostrando resultados para: <span className="font-semibold">"{query}"</span>
      </p>

      {filteredProductos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredProductos.map((producto) => (
            <Link key={producto.id} href={`/producto?idProducto=${producto.id}`}>
              <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
                <img
                  src={producto.fotoPerfil}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="text-lg font-semibold mt-2">{producto.nombre}</h2>
                <p className="text-gray-600 text-sm">{producto.descripcion.slice(0, 100)}...</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default Resultados;
