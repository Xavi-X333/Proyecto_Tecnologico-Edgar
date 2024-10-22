import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './agregarproductos.css';

const ProductosManager = () => {
  const [productos, setProductos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  // Estados para el formulario
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen_url: ''
  });

  useEffect(() => {
    fetchProductos();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('productos')
      .insert([formData]);

    if (error) {
      console.error('Error al agregar producto:', error.message);
    } else {
      console.log('Producto agregado con éxito:', data);
      setFormData({
        titulo: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen_url: ''
      });
      fetchProductos();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar producto:', error.message);
    } else {
      fetchProductos();
    }
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);
    setFormData({
      titulo: producto.titulo,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagen_url: producto.imagen_url
    });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('productos')
      .update(formData)
      .eq('id', editingId);

    if (error) {
      console.error('Error al actualizar producto:', error.message);
    } else {
      setEditingId(null);
      setFormData({
        titulo: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen_url: ''
      });
      fetchProductos();
    }
  };

  return (
    <div className="productos-manager">
      {/* Formulario */}
      <div className="form-container">
        <h2>{editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
        <form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(); } : handleSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>URL de la imagen:</label>
            <input
              type="url"
              name="imagen_url"
              value={formData.imagen_url}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editingId ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
          
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  titulo: '',
                  descripcion: '',
                  precio: '',
                  stock: '',
                  imagen_url: ''
                });
              }}
            >
              Cancelar Edición
            </button>
          )}
        </form>
      </div>

      {/* Tabla */}
      <div className="table-container">
        <h2>Lista de Productos</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.titulo}</td>
                <td>{producto.descripcion}</td>
                <td>${producto.precio}</td>
                <td>{producto.stock}</td>
                <td>
                  <img 
                    src={producto.imagen_url} 
                    alt={producto.titulo} 
                    className="producto-imagen"
                  />
                </td>
                <td className="acciones">
                  <button
                    onClick={() => handleEdit(producto)}
                    className="btn btn-edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(producto.id)}
                    className="btn btn-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductosManager;