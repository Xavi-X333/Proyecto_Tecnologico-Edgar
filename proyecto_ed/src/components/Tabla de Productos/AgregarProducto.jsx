import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const AgregarProducto = ({ productoAgregado }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('productos')
      .insert([
        { titulo, descripcion, precio, stock, imagen_url: imagenUrl }
    ]);

    if (error) {
      console.error('Error al agregar producto:', error.message);
      return
    } else {
      console.log('Producto agregado:', data[0]);
      productoAgregado(data[0]);
      setTitulo('');
      setDescripcion('');
      setPrecio('');
      setStock('');
      setImagenUrl('');
    }
  };

  return (
    <div>
      <h2>Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        {}
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
