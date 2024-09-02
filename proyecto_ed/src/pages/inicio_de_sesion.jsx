import React from 'react';
import './inicio_de_sesion.css'

function Inicio_de_Sesion() {
    return (
        <div className='wrapper'>
            <div className='form-box login'>
                <form action=''>
                    <h1>Iniciar Sesión</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Usuario' required></input>
                        <svg className='icon' xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Contraseña' required></input>
                        <svg className='icon' xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                    </div>
                    <div className="recordar">
                        <label><input type='checkbox'/>Recordar</label>
                        <a href='#'>Olvido su contraseña?</a>
                    </div>
                    <button type='summit'>Siguiente</button>
                    <div className='register-link'>
                        <p>No tienes una cuenta? <a href='#'>Registrate</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Inicio_de_Sesion;