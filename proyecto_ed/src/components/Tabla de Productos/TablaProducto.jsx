import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import AgregarProducto from './AgregarProducto';

const TablaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [editarproducto, setEditarproducto] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*');

    if (error) {
      console.error('Error fetching productos:', error.message);
    } else {
      setProductos(data);
    }
  };

  const agregarProductosalaTabla = (producto) => {
    setProductos([...productos, producto]);
  };

  const actualizarProductos = async (id, actualizaciondeproductos) => {
    const { data, error } = await supabase
      .from('products')
      .update(actualizaciondeproductos)
      .eq('id', id);

    if (error) {
      console.error('Error al actualizar los productos:', error.message);
    } else {
      setProductos(productos.map(p => (p.id === id ? data[0] : p)));
      setEditarproducto(null);
    }
  };

  const EliminarProducto = async (id) => {
    const { error } = await supabase
      .from('productps')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar producto:', error.message);
    } else {
      setProductos(productos.filter((producto) => producto.id !== id));
    }
  };

  const handleEditClick = (producto) => {
    setEditarproducto(producto);
  };

  const handleSaveClick = () => {
    if (editarproducto) {
      actualizarProductos(editarproducto.id, {
        titulo: editarproducto.titulo,
        descripcion: editarproducto.descripcion,
        precio: editarproducto.precio,
        stock: editarproducto.stock,
        imagen_url: editarproducto.imagen_url,
      });
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <AgregarProducto onProductoAgregado={agregarProductosalaTabla} />  {}
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
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
              <td>
                {editarproducto && editarproducto.id === producto.id ? (
                  <input
                    type="text"
                    value={editarproducto.titulo}
                    onChange={(e) => setEditarproducto({ ...editarproducto, titulo: e.target.value })}
                  />
                ) : (
                  producto.titulo
                )}
              </td>
              <td>
                {editarproducto && editarproducto.id === producto.id ? (
                  <input
                    type="text"
                    value={editarproducto.descripcion}
                    onChange={(e) => setEditarproducto({ ...editarproducto, descripcion: e.target.value })}
                  />
                ) : (
                  producto.descripcion
                )}
              </td>
              <td>
                {editarproducto && editarproducto.id === producto.id ? (
                  <input
                    type="number"
                    value={editarproducto.precio}
                    onChange={(e) => setEditarproducto({ ...editarproducto, precio: e.target.value })}
                  />
                ) : (
                  `$${producto.precio}`
                )}
              </td>
              <td>
                {editarproducto && editarproducto.id === producto.id ? (
                  <input
                    type="number"
                    value={editarproducto.stock}
                    onChange={(e) => setEditarproducto({ ...editarproducto, stock: e.target.value })}
                  />
                ) : (
                  `${producto.stock}`
                )}
              </td>
              <td>
                {editarproducto && editarproducto.id === producto.id ? ( 
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) => setEditarproducto({ ...editarproducto, descripcion: e.target.value })}
                  />
                ) : (
                  producto.descripcion
                )}
              </td>
              <td>
                {editarproducto && editarproducto.id === producto.id ? (
                  <input
                    type="number"
                    value={editarproducto.precio}
                    onChange={(e) => setEditarproducto({ ...editarproducto, precio: e.target.value })}
                  />
                ) : (
                  `$${producto.precio}`
                )}
              </td>
              <td>
                <img src={producto.imagen_url} alt={producto.titulo} width="50" />
              </td>
              <td>
                {editarproducto && editarproducto.id === producto.id ? (
                  <button onClick={handleSaveClick}>Guardar</button>
                ) : (
                  <button onClick={() => handleEditClick(producto)}>Editar</button>
                )}
                <button onClick={() => EliminarProducto(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;
