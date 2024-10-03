import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('products')
      .insert([
        { name, description, price, image_url: imageUrl }
      ]);

    if (error) {
      console.error('Error al agregar producto:', error.message);
    } else {
      console.log('Producto agregado:', data[0]);
      onProductAdded(data[0]);
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
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

export default AddProduct;
