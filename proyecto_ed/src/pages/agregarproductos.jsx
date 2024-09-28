import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const AddProduct = async(product) => {
  const [nombre, setName] = useState('');
  const [descripcion, setDescription] = useState('');
  const [precio, setPrice] = useState('');
  const [imagenUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('products')
      .insert([
        { name: product.name, description: product.description, price: product.price, image_url: product.image_url }
    ]);


    if (error) {
      console.error('Error al agregar producto:', error.message);
      return
    } else {
      console.log('Producto agregado con exito:', data);
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre del producto:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Descripcion:</label>
          <textarea 
            value={descripcion} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Precio:</label>
          <input 
            type="number" 
            value={precio} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>URL de la imagen:</label>
          <input 
            type="text" 
            value={imagenUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
