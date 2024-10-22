import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useUser } from '@clerk/clerk-react';

const Carrito_de_Compras = () => {
  const { usuario } = useUser();
  const [elementos_carrito, setElementosCarrito] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data: productos, error } = await supabase
        .from('productos')
        .select('*');
      if (!error) setProductos(productos);
    };

    fetchProductos();
  }, []);


  const agregar_al_carrito = async (producto) => {
    const { error } = await supabase
      .from('carritos')
      .insert([{ 
        usuario_id: usuario.id,
        producto_id: producto.id, 
        cantidad: 1
      }]);
  
    if (error) {
      console.error('Error al agregar el producto al carrito:', error.mensaje);
    } else {
      setElementosCarrito(prevItems => [...prevItems, { ...producto, cantidad: 1 }]);
    }
  };
  

  useEffect(() => {
    const fetchElementos = async () => {
      const { data: carro, error } = await supabase
        .from('carritos')
        .select('producto_id, cantidad')
        .eq('usuario_id', usuario.id);

      if (!error) {
        const detalles = await Promise.all(
          carro.map(async (item) => {
            const { data: producto } = await supabase
              .from('productos')
              .select('*')
              .eq('id', item.producto_id)
              .single();
            return { ...producto, cantidad: item.cantidad };
          })
        );
        setCartItems(detalles);
      }
    };

    if (usuario) fetchElementos();
  }, [usuario]);

  const confirmOrder = async () => {
    const { data: orden, error: ordenError } = await supabase
      .from('pedidos')
      .insert([{ usuario_id: usuario.id, fecha: new Date(), estado: 'pendiente' }])
      .select()
      .single();

    if (!ordenError) {
      await Promise.all(
        elementos_carrito.map(async (elemento) => {
          await supabase
            .from('detalles_pedidos')
            .insert([{ pedido_id: orden.id_pedidos, producto_id: elemento.id, cantidad: elemento.cantidad }]);
          await supabase
            .from('productos')
            .update({ stock: elemento.stock -  elemento.cantidad })
            .eq('id', elemento.id);
        })
      );

      await supabase
        .from('carritos')
        .delete()
        .eq('usuario_id', usuario.id);

      setElementosCarrito([]);
      alert('Pedido confirmado con éxito.');
    } else {
      console.error('Error al confirmar el pedido:', ordenError);
    }
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <div>
        <h2>Productos disponibles</h2>
        {productos.map(producto => (
          <div key={producto.id}>
            <p>{producto.titulo}</p>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <button onClick={() => agregar_al_carrito(producto)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Mi Carrito</h2>
        {elementos_carrito.length > 0 ? (
          elementos_carrito.map(elemento => (
            <div key={elemento.id}>
              <p>{elemento.titulo} - {elemento.cantidad} unidades</p>
            </div>
          ))
        ) : (
          <p>El carrito está vacío.</p>
        )}

        {elementos_carrito.length > 0 && (
          <button onClick={confirmOrder}>Confirmar Pedido</button>
        )}
      </div>
    </div>
  );
};

export default Carrito_de_Compras;
