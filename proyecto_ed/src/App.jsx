import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/navbar/navbar';
import Productos from './pages/productos';
import Pedidos from './pages/pedidos';
import Contacto from './pages/contacto';
import Inicio from './pages/inicio';
import Inicio_de_Sesion from './pages/inicio_de_sesion';
import AgregarProductos from './pages/agregarproductos';

function App() {
    return (
      <div className='contenido_principal'>
        <SpeedInsights />
        <Analytics />
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/inicio_de_sesion" element={<Inicio_de_Sesion />} />
                <Route path="/agregar_productos" element={<AgregarProductos />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
