import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const AddProduct = ({ onProductoAgregado }) => {
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
      return;
    } else {
      console.log('Producto agregado con exito:', data);
      setTitulo('');
      setDescripcion('');
      setPrecio('');
      setStock('');
      setImagenUrl('');
      onProductoAgregado();
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Titulo del producto:</label>
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Descripción:</label>
          <textarea 
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Precio:</label>
          <input 
            type="number" 
            value={precio} 
            onChange={(e) => setPrecio(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Stock:</label>
          <input 
            type="number" 
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>URL de la imagen:</label>
          <input 
            type="text" 
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
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

const ProductoTabla = ({ productos, eliminarProducto }) => {

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar producto:', error.message);
      return;
    } else {
      console.log('Producto eliminado con exito:', data);
      eliminarProducto();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Lista de productos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Descripción</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Imagen</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.titulo}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.descripcion}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.precio}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.stock}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <img src={producto.imagen_url} alt={producto.titulo} style={{ width: '100px' }} />
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AgregarProductoPage = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*');

    if (error) {
      console.error('Error al cargar productos:', error.message);
    } else {
      setProductos(data);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <AddProduct onProductoAgregado={fetchProductos} />
      <ProductoTabla productos={productos} eliminarProducto={fetchProductos} />
    </div>
  );
};

export default AgregarProductoPage;