import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './carritodecompras.css';

const CarritoDeComprasApp = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    obtenerProductos();
    cargarCarritoDeLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carrito));
    calcularTotal();
  }, [carrito]);

  const obtenerProductos = async () => {
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

  const cargarCarritoDeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  };

  const calcularTotal = () => {
    const nuevoTotal = carrito.reduce((suma, item) => {
      return suma + (item.precio * item.cantidad);
    }, 0);
    setTotal(nuevoTotal);
  };

  const agregarAlCarrito = (producto) => {
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

  const removerDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  const actualizarCantidad = (productoId, delta) => {
    setCarrito(carrito.map(item => {
      if (item.id === productoId) {
        const nuevaCantidad = item.cantidad + delta;
        const producto = productos.find(p => p.id === productoId);
        
        if (nuevaCantidad > 0 && nuevaCantidad <= producto.stock) {
          return { ...item, cantidad: nuevaCantidad };
        }
      }
      return item;
    }));
  };

  const generarMensajeWhatsApp = () => {
    const mensaje = `
      Pedido de ${nombreCliente}\n
      Teléfono: +502 ${telefonoCliente}\n
      Total: Q.${total.toFixed(2)}\n
      Productos:\n
      ${carrito.map(item => `- ${item.titulo} x ${item.cantidad} (Q.${item.precio} c/u)`).join('\n')}
    `;

    const linkWhatsapp = `https://wa.me/502${telefonoCliente}?text=${encodeURIComponent(mensaje)}`;
    window.open(linkWhatsapp, '_blank');
  };

  const enviarPedido = async () => {
    if (!nombreCliente || !telefonoCliente || carrito.length === 0) {
      return;
    }

    setCargando(true);

    const miNumero = "50247676566";

    const mensaje = `
      Pedido de ${nombreCliente}\n
      Teléfono: +502 ${telefonoCliente}\n
      Total: Q.${total.toFixed(2)}\n
      Productos:\n
      ${carrito.map(item => `- ${item.titulo} x ${item.cantidad} (Q.${item.precio} c/u)`).join('\n')}
    `;

    const linkWhatsapp = `https://wa.me/${miNumero}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(linkWhatsapp, '_blank');

    try {
      const { data: datosPedido, error: errorPedido } = await supabase
        .from('pedidos')
        .insert([{
          nombre_cliente: nombreCliente,
          telefono_cliente: telefonoCliente,
          total_de_compra: total,
          status: 'pending'
        }])
        .select()
        .single();

      if (errorPedido) throw errorPedido;

      const elementosPedido = carrito.map(item => ({
        pedido_id: datosPedido.id,
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_al_momento: item.precio
      }));

      const { error: errorElementos } = await supabase
        .from('elementos_del_pedido')
        .insert(elementosPedido);

      if (errorElementos) throw errorElementos;

      for (const item of carrito) {
        const { error: errorStock } = await supabase
          .from('productos')
          .update({ stock: item.stock - item.cantidad })
          .eq('id', item.id);

        if (errorStock) throw errorStock;
      }

      setCarrito([]);
      setNombreCliente('');
      setTelefonoCliente('');
      obtenerProductos();

    } catch (error) {
      console.error('Error en el envío del pedido:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="shopping-cart-container">
      <div className="products-grid">
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
                    onClick={() => agregarAlCarrito(producto)}
                    disabled={producto.stock === 0}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

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
                    onClick={() => removerDelCarrito(item.id)}
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
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
              />
              <input
                type="text"
                className="customer-input"
                placeholder="Teléfono"
                value={telefonoCliente}
                onChange={(e) => setTelefonoCliente(e.target.value)}
              />
              <div className="checkout-footer">
                <div className="total-amount">
                  Total: Q.{total.toFixed(2)}
                </div>
                <button
                  className="submit-button"
                  onClick={enviarPedido}
                  disabled={cargando || !nombreCliente || !telefonoCliente}
                >
                  {cargando ? 'Procesando...' : 'Confirmar y Enviar por WhatsApp'}
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

export default CarritoDeComprasApp;