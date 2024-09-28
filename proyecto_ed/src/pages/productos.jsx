import React, { useEffect, useState } from 'react';
import './productos.css';
import { supabase } from '../../supabaseClient';

const Productos = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    let { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(products);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <div className='contenedor'>
      {products.map((product) => (
        <div className='producto' key={product.id}>
          <img
            className='imagen-producto'
            src={product.image_url}
            alt={product.name}
          />
          <div className='info-producto'>
            <p className='titulo'>{product.name}</p>
            <p className='descripcion'>{product.description}</p>
            <p className='precio'>Q. {product.price}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Productos;
