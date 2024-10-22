import React, { useState } from 'react';
import './contacto.css';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_DELICE_API_KEY);

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['javierdpaz8@gmail.com', 'guzmancitaprado@gmail.com'],
        subject: `Formulario de Contacto - Nombre: ${nombre} - Correo: ${correo}`,
        html: `<p>${mensaje}</p>`,
      });

      if (error) {
        console.error('Error enviando el correo:', error);
      } else {
        console.log('Correo enviado con éxito:', data);
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
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
