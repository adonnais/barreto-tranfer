'use client'
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Carga dinámica con un componente de Loading
const Cover = dynamic(() => import('./cover'), { loading: () => <p>Cargando Cover...</p> });
const Enjoy = dynamic(() => import('./enjoy'), { loading: () => <p>Cargando Enjoy...</p> });
const Video = dynamic(() => import('./video'), { loading: () => <p>Cargando Video...</p> });
const Feedback = dynamic(() => import('./feedback'), { loading: () => <p>Cargando Feedback...</p> });
const Footer = dynamic(() => import('./footer'), { loading: () => <p>Cargando Footer...</p> });

export default function Index() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/barreto-tranfer.json');
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }
        const jsonData = await response.json();
        setItems(jsonData);
      } catch (error) {
        console.error('Hubo un problema con la petición Fetch:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <p className="text-lg font-semibold">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 lg:pt-[16px] pt-[14px]">
      <Cover items={items} />
      <Footer />
      <Enjoy items={items} />
      <Feedback items={items} />
      <footer className="bg-gray-900 text-white text-center py-4 w-full">
      <p className="text-sm">&copy; 2025 Barretto Transfer. Todos los derechos reservados.</p>
    </footer>
    </div>
  );
}
