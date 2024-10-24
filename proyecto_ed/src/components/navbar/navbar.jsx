import React, { useState } from "react";
import logo from "../../assets/images/logo3.png";
import { Link } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <Link to="/">
                <img className="Logo" src={logo} alt="Logo" />
            </Link>
            <button className="navbar-toggle" onClick={toggleMenu}>
                &#9776;
            </button>
            <nav className={`navbar ${isOpen ? 'open' : ''}`}>
                <Link to="/">Inicio</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/carritodecompras">Carrito de Compras</Link>
                <Link to="/agregar_productos">Agregar Productos</Link>
            </nav>
        </header>
    );
};

export default Navbar;

/* <Link to="/contacto">Contacto</Link>
    <Link to="/inicio_de_sesion">Inicio de Sesión</Link>
    
*/