import React, { useEffect, useState } from 'react';
import './productos.css';
import { supabase } from '../../supabaseClient';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    let { data: productos, error } = await supabase
      .from('productos')
      .select('*');

    if (error) {
      console.error('Error fetching productos:', error);
    } else {
      setProductos(productos);
    }
  };
  
  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <>
    <div className='contenedor'>
      {productos.map((producto) => (
        <div className='producto' key={producto.id}>
          <img
            className='imagen-producto'
            src={producto.imagen_url}
            alt={producto.titulo}
          />
          <div className='info-producto'>
            <p className='titulo'>{producto.titulo}</p>
            <p className='descripcion'>{producto.descripcion}</p>
            <p className='stock'>Stock: {producto.stock}</p>
            <p className='precio'>Q. {producto.precio}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Productos;
