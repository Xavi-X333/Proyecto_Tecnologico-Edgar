import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './carritodecompras.css';

const ShoppingCartApp = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [NombreCliente, setNombreCliente] = useState('');
  const [EmailCliente, setEmailCliente] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductos();
    cargarcarritodelLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carrito));
    calcularTotal();
  }, [carrito]);

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error recuperando productos:', error);
      return;
    }
    
    setProductos(data);
  };

  const cargarcarritodelLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCarrito(JSON.parse(savedCart));
    }
  };

  const calcularTotal = () => {
    const newTotal = carrito.reduce((sum, item) => {
      return sum + (item.precio * item.cantidad);
    }, 0);
    setTotal(newTotal);
  };

  const agregaralCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      if (itemExistente.cantidad >= producto.stock) {
        return;
      }
      
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const removerdelcarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  const actualizarCantidad = (productoId, delta) => {
    setCarrito(carrito.map(item => {
      if (item.id === productoId) {
        const nuevaCantidad = item.cantidad + delta;
        const producto = productos.find(p => p.id === productoId);
        
        if ( nuevaCantidad > 0 && nuevaCantidad <= producto.stock) {
          return { ...item, cantidad: nuevaCantidad };
        }
      }
      return item;
    }));
  };

  const generarOrdenHTML = () => {
    return `
      <h2>Pedido de ${NombreCliente}</h2>
      <p>Email: ${EmailCliente}</p>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${carrito.map(item => `
            <tr>
              <td>${item.titulo}</td>
              <td>${item.cantidad}</td>
              <td>Q.${item.precio}</td>
              <td>Q.${(item.precio * item.cantidad).toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td><strong>Q.${total.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
    `;
  };

  const submitOrder = async () => {
    if (!NombreCliente || !EmailCliente || carrito.length === 0) {
      return;
    }

    setLoading(true);

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('pedidos')
        .insert([{
          nombre_cliente: NombreCliente,
          email_cliente: EmailCliente,
          total_de_compra: total,
          status: 'pending'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = carrito.map(item => ({
        pedido_id: orderData.id,
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_al_momento: item.precio
      }));

      const { error: itemsError } = await supabase
        .from('elementos_del_pedido')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      for (const item of carrito) {
        const { error: stockError } = await supabase
          .from('productos')
          .update({ stock: item.stock - item.cantidad })
          .eq('id', item.id);

        if (stockError) throw stockError;
      }

      setCarrito([]);
      setNombreCliente('');
      setEmailCliente('');
      fetchProductos();

    } catch (error) {
      console.error('Error en el envio del pedido:', error);
    } finally {
      setLoading(false);
    }
  };



  
  return (
    <div className="shopping-cart-container">
      <div className="products-grid">
        {/* Lista de Productos */}
        <div className="products-section">
          <h2 className="section-title">Productos Disponibles</h2>
          <div className="products-list">
            {productos.map(producto => (
              <div key={producto.id} className="product-card">
                <div className="product-info">
                  <img src={producto.imagen_url} alt={producto.titulo} className="product-image" />
                  <h3 className="product-title">{producto.titulo}</h3>
                  <p className="product-description">{producto.descripcion}</p>
                  <p className="product-price">Q.{producto.precio}</p>
                  <p className="product-stock">
                    Stock: {producto.stock}
                    {producto.stock === 0 && (
                      <span className="out-of-stock-badge">Agotado</span>
                    )}
                  </p>
                  <button
                    className="add-to-cart-button"
                    onClick={() => agregaralCarrito(producto)}
                    disabled={producto.stock === 0}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carrito */}
        <div className="cart-section">
          <h2 className="section-title">Carrito de Compras</h2>
          
          <div className="cart-items">
            {carrito.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.titulo}</h3>
                  <p className="cart-item-price">Q.{item.precio} x {item.cantidad}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="quantity-button"
                    onClick={() => actualizarCantidad(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.cantidad}</span>
                  <button
                    className="quantity-button"
                    onClick={() => actualizarCantidad(item.id, 1)}
                    disabled={item.cantidad >= item.stock}
                  >
                    +
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => removerdelcarrito(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {carrito.length > 0 ? (
            <div className="checkout-section">
              <h3 className="checkout-title">Información del Cliente</h3>
              <input
                type="text"
                className="customer-input"
                placeholder="Nombre"
                value={NombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
              />
              <input
                type="email"
                className="customer-input"
                placeholder="Email"
                value={EmailCliente}
                onChange={(e) => setEmailCliente(e.target.value)}
              />
              <div className="checkout-footer">
                <div className="total-amount">
                  Total: Q.{total.toFixed(2)}
                </div>
                <button
                  className="submit-button"
                  onClick={submitOrder}
                  disabled={loading || !NombreCliente || !EmailCliente}
                >
                  {loading ? 'Procesando...' : 'Confirmar Pedido'}
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <p>El carrito está vacío</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartApp;