import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './agregarproductos.css';

const ProductosManager = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen_url: ''
  });
  const [editingId, setEditingId] = useState(null);

  const [authenticated, setAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setAuthenticated(true);
    }
    
    const lockTime = localStorage.getItem('lock_time');
    if (lockTime && new Date().getTime() - lockTime < 300000) { // 5 minutos
      setIsLocked(true);
    }
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

  useEffect(() => {
    if (authenticated) {
      fetchProductos();
    }
  }, [authenticated]);

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

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      alert('Has excedido el número de intentos. Intenta de nuevo en 5 minutos.');
      return;
    }

    const { email, password } = loginData;

    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('password', password);

    if (error || data.length === 0) {
      setLoginAttempts(prev => prev + 1);

      if (loginAttempts + 1 >= 5) {
        setIsLocked(true);
        localStorage.setItem('lock_time', new Date().getTime());
        alert('Has excedido el número de intentos. Intenta de nuevo en 5 minutos.');
      } else {
        alert('Usuario o contraseña incorrectos. Intentos restantes: ' + (5 - loginAttempts - 1));
      }
    } else {
      localStorage.setItem('auth_token', 'authenticated');
      setAuthenticated(true);
    }
  };

  return (
    <div>
      {!authenticated ? (
        <div className="login-overlay">
          <div className="login-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  disabled={isLocked}
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  disabled={isLocked}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isLocked}>
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      ) : (
        

    <div className="productos-manager">
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
                <td>Q.{producto.precio}</td>
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
    </div> //
      )}
    </div>
  );
};

export default ProductosManager;
