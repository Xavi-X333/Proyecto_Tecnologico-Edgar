import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/navbar/navbar';
import Productos from './pages/productos';
import Inicio from './pages/inicio';
import Carrito_de_Compras from './pages/carritodecompras';
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
                <Route path="/carritodecompras" element={<Carrito_de_Compras />} />
                <Route path="/agregar_productos" element={<AgregarProductos />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
