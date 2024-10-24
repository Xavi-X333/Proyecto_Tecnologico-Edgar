import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './agregarproductos.css';

const ProductosManager = () => {
  const [productos, setProductos] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen_url: ''
  });
  const [idEdicion, setIdEdicion] = useState(null);

  const [autenticado, setAutenticado] = useState(false);
  const [datosLogin, setDatosLogin] = useState({ email: '', password: '' });
  const [intentosLogin, setIntentosLogin] = useState(0);
  const [estaBloqueado, setEstaBloqueado] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      setAutenticado(true);
    }
    
    const tiempoBloqueo = sessionStorage.getItem('lock_time');
    if (tiempoBloqueo && new Date().getTime() - tiempoBloqueo < 300000) { // 5 minutos
      setEstaBloqueado(true);
    }
  }, []);

  const obtenerProductos = async () => {
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
    if (autenticado) {
      obtenerProductos();
    }
  }, [autenticado]);

  const manejarCambioEntrada = (e) => {
    const { name, value } = e.target;
    setDatosFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('productos')
      .insert([datosFormulario]);
    if (error) {
      console.error('Error al agregar producto:', error.message);
    } else {
      console.log('Producto agregado con éxito:', data);
      setDatosFormulario({
        titulo: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen_url: ''
      });
      obtenerProductos();
    }
  };

  const manejarEliminacion = async (id) => {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error al eliminar producto:', error.message);
    } else {
      obtenerProductos();
    }
  };

  const manejarEdicion = (producto) => {
    setIdEdicion(producto.id);
    setDatosFormulario({
      titulo: producto.titulo,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagen_url: producto.imagen_url
    });
  };

  const manejarActualizacion = async () => {
    const { error } = await supabase
      .from('productos')
      .update(datosFormulario)
      .eq('id', idEdicion);
    if (error) {
      console.error('Error al actualizar producto:', error.message);
    } else {
      setIdEdicion(null);
      setDatosFormulario({
        titulo: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen_url: ''
      });
      obtenerProductos();
    }
  };

  const manejarCambioLogin = (e) => {
    const { name, value } = e.target;
    setDatosLogin(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarEnvioLogin = async (e) => {
    e.preventDefault();
    
    if (estaBloqueado) {
      alert('Has excedido el número de intentos. Intenta de nuevo en 5 minutos.');
      return;
    }

    const { email, password } = datosLogin;

    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('password', password);

    if (error || data.length === 0) {
      setIntentosLogin(prev => prev + 1);

      if (intentosLogin + 1 >= 5) {
        setEstaBloqueado(true);
        sessionStorage.setItem('lock_time', new Date().getTime());
        alert('Has excedido el número de intentos. Intenta de nuevo en 5 minutos.');
      } else {
        alert('Usuario o contraseña incorrectos. Intentos restantes: ' + (5 - intentosLogin - 1));
      }
    } else {
      sessionStorage.setItem('auth_token', 'authenticated');
      setAutenticado(true);
    }
  };

  return (
    <div>
      {!autenticado ? (
        <div className="login-overlay">
          <div className="login-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={manejarEnvioLogin}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={datosLogin.email}
                  onChange={manejarCambioLogin}
                  required
                  disabled={estaBloqueado}
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={datosLogin.password}
                  onChange={manejarCambioLogin}
                  required
                  disabled={estaBloqueado}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={estaBloqueado}>
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="productos-manager">
          <div className="form-container">
            <h2>{idEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
            <form onSubmit={idEdicion ? (e) => { e.preventDefault(); manejarActualizacion(); } : manejarEnvio}>
              <div className="form-group">
                <label>Título:</label>
                <input
                  type="text"
                  name="titulo"
                  value={datosFormulario.titulo}
                  onChange={manejarCambioEntrada}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  value={datosFormulario.descripcion}
                  onChange={manejarCambioEntrada}
                  required
                />
              </div>

              <div className="form-group">
                <label>Precio:</label>
                <input
                  type="number"
                  name="precio"
                  value={datosFormulario.precio}
                  onChange={manejarCambioEntrada}
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock:</label>
                <input
                  type="number"
                  name="stock"
                  value={datosFormulario.stock}
                  onChange={manejarCambioEntrada}
                  required
                />
              </div>

              <div className="form-group">
                <label>URL de la imagen:</label>
                <input
                  type="url"
                  name="imagen_url"
                  value={datosFormulario.imagen_url}
                  onChange={manejarCambioEntrada}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {idEdicion ? 'Guardar Cambios' : 'Agregar Producto'}
              </button>
              
              {idEdicion && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIdEdicion(null);
                    setDatosFormulario({
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
                        onClick={() => manejarEdicion(producto)}
                        className="btn btn-edit"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => manejarEliminacion(producto.id)}
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
      )}
    </div>
  );
};

export default ProductosManager;