import React from "react"
import logo from "../../assets/images/logo edgar.svg";
import { Link } from "react-router-dom"
import './navbar.css'

const Navbar = () => {
    return (
        <header className="header">
            <Link to="/">
                <img className="Logo" src={logo} alt="Logo"/>
            </Link>
            <nav className="navbar">
                <Link to="/">Inicio</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/pedidos">Pedidos</Link>
                <Link to="/contacto">Contacto</Link>
                <Link to="/inicio_de_sesion">Inicio de Seción</Link>
            </nav>
        </header>
    )
}

export default Navbar;