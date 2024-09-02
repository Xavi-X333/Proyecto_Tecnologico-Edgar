import React from "react"
//import logo from "../../assets/images/logo1.jpg"
import { Link } from "react-router-dom"
import './navbar.css'

const Navbar = () => {
    return (
        <header className="header">
            <a href='../../assets/images/logo1.jpg' className="logo">*Logo*</a>
            <nav className="navbar">
                <Link to="/">Inicio</Link>
                <Link to="/src/pages/productos.jsx">Productos</Link>
                <Link to="/src/pages/pedidos.jsx">Pedidos</Link>
                <Link to="/src/pages/contacto.jsx">Contacto</Link>
                <Link to="/src/pages/inicio_de_sesion.jsx">Inicio de Seción</Link>
            </nav>
        </header>
    )
}

export default Navbar;