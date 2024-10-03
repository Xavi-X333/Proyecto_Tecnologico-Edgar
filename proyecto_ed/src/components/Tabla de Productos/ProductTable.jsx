import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import AddProduct from './AddProduct';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error.message);
    } else {
      setProducts(data);
    }
  };

  const addProductToTable = (product) => {
    setProducts([...products, product]);
  };

  const updateProduct = async (id, updatedProduct) => {
    const { data, error } = await supabase
      .from('products')
      .update(updatedProduct)
      .eq('id', id);

    if (error) {
      console.error('Error updating product:', error.message);
    } else {
      setProducts(products.map(p => (p.id === id ? data[0] : p)));
      setEditingProduct(null);
    }
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error.message);
    } else {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleSaveClick = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        image_url: editingProduct.image_url,
      });
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <AddProduct onProductAdded={addProductToTable} />  {/* Añadir el formulario */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <input
                    type="text"
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td>
                <img src={product.image_url} alt={product.name} width="50" />
              </td>
              <td>
                {editingProduct && editingProduct.id === product.id ? (
                  <button onClick={handleSaveClick}>Guardar</button>
                ) : (
                  <button onClick={() => handleEditClick(product)}>Editar</button>
                )}
                <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
