import React from 'react';
import './contacto.css';

function Contacto() {
    return (
        <section className='contacto'>
            <form>
                <h1>Llena este formulario</h1>
                <div className="input-box">
                    <label>Nombre Completo</label>
                    <input type='text' className='field' placeholder='Ingresa tu nombre' required/>
                </div>
                <div className="input-box">
                    <label>Correo Electronico</label>
                    <input type='email' className='field' placeholder='Ingresa tu correo' required/>
                </div>
                <div className="input-box">
                    <label>Mensaje</label>
                    <textarea name='' id='' className='field mess' placeholder='Ingresa tu mensaje' required></textarea>
                </div>
                <button className='boton-contacto' type='submit'>Enviar</button>
            </form>
        </section>
    );
}

export default Contacto;
