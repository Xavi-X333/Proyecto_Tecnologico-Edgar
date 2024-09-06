import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Productos from './pages/productos';
import Pedidos from './pages/pedidos';
import Contacto from './pages/contacto';
import Inicio from './pages/inicio';
import Inicio_de_Sesion from './pages/inicio_de_sesion';

function App() {
    return (
      <div className='contenido_principal'>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route   path="/src/pages/productos.jsx" element={<Productos />} />
                <Route path="/src/pages/pedidos.jsx" element={<Pedidos />} />
                <Route path="/src/pages/contacto.jsx" element={<Contacto />} />
                <Route path="/src/pages/inicio_de_sesion.jsx" element={<Inicio_de_Sesion />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
