'use client'
import Cover from './cover';
import Enjoy from './enjoy';
import Video from './video';
import Feedback from './feedback'
import { useState, useEffect } from "react";


export default function Index() {
  const [items, setItems] = useState([]);
  
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
        }
      };
      fetchData();
    }, []);
  return (
    <>
     <Cover items={items} />
     <Enjoy items={items}/>
     <Video items={items} />
     <Feedback items={items} />
     
    </>
  );
}
