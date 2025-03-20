"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

const ResultadosContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("/barreto-tranfer.json");
        if (!response.ok) throw new Error("Error al cargar productos");
        const data = await response.json();

        setProductos(data.productos);

        const filtered = data.productos.filter(
          (p) =>
            p.nombre.toLowerCase().includes(query) ||
            p.descripcion.toLowerCase().includes(query)
        );

        setFilteredProductos(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [query]);

  if (loading) return <p className="text-gray-600 mt-4">Cargando productos...</p>;
  if (error) return <p className="text-red-600 mt-4">Error: {error}</p>;

  return (
    <div className="pt-[10%] px-6 lg:px-14">
      <h1 className="text-2xl font-bold">Resultados de búsqueda</h1>
      <p className="text-gray-600 mt-2">
        Mostrando resultados para: <span className="font-semibold">"{query}"</span>
      </p>

      {filteredProductos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredProductos.map((producto) => (
            <Link key={producto.id} href={`/producto?idProducto=${producto.id}`} className="block">
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

const Resultados = () => {
  return (
    <Suspense fallback={<p className="text-gray-600 mt-4">Cargando búsqueda...</p>}>
      <ResultadosContent />
    </Suspense>
  );
};

export default Resultados;
