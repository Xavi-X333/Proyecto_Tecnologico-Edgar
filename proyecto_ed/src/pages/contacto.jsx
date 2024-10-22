import React, { useState } from 'react';
import './contacto.css';

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/proyecto_ed/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, correo, mensaje }),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('Correo enviado con éxito:', result);
    } else {
      console.error('Error al enviar el correo:', result.error);
    }
  };

  return (
    <section className='contacto'>
      <form onSubmit={handleSubmit}>
        <h1>Llena este formulario</h1>
        <div className="input-box">
          <label>Nombre Completo</label>
          <input 
            type='text' 
            className='field' 
            placeholder='Ingresa tu nombre' 
            required 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>
        <div className="input-box">
          <label>Correo Electrónico</label>
          <input 
            type='email' 
            className='field' 
            placeholder='Ingresa tu correo' 
            required 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
          />
        </div>
        <div className="input-box">
          <label>Mensaje</label>
          <textarea 
            className='field mess' 
            placeholder='Ingresa tu mensaje' 
            required 
            value={mensaje} 
            onChange={(e) => setMensaje(e.target.value)} 
          ></textarea>
        </div>
        <button className='boton-contacto' type='submit'>Enviar</button>
      </form>
    </section>
  );
}

export default Contacto;
