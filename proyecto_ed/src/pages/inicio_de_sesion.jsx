import React, { useState } from 'react';
import './inicio_de_sesion.css'

function Inicio_de_Sesion() {

    const [action, setAction] = useState('');

    const registerLink = () =>   {
        setAction(' active');
    }

    const loginlink = () => {
        setAction('');
    }

    return (
        <div className={`wrapper${action}`}>
            <div className='form-box login'>
                <form action=''>
                    <h1>Iniciar Sesión</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Usuario' required></input>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Contraseña' required></input>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                    </div>
                    <div className="recordar">
                        <label><input type='checkbox'/>Recordar</label>
                        <a href='#'>Olvido su contraseña?</a>
                    </div>
                    <button className='boton-login' type='summit'>Siguiente</button>
                    <div className='register-link'>
                        <p>No tienes una cuenta? <a href='#' onClick={registerLink}>Registrate</a></p>
                    </div>
                </form>
            </div>

            <div className='form-box registrarse'>
                <form action=''>
                    <h1>Registrate</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Usuario' required></input>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                    </div>
                    <div className='input-box'>
                        <input type='correo' placeholder='Correo' required></input>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg>
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Contraseña' required></input>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                    </div>
                    <div className="recordar">
                        <label><input type='checkbox'/>Acepto los terminos y condiciones</label>
                    </div>
                    <button className='boton-login' type='summit'>Registrarse</button>
                    <div className='register-link'>
                        <p>Ya tienes una cuenta? <a href='#' onClick={loginlink}>Inicia Sesion</a></p>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Inicio_de_Sesion;