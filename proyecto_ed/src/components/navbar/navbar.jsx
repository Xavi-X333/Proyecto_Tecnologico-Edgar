import React from "react"
//import logo from "../../assets/images/logo edgar.svg"
import { Link } from "react-router-dom"
import './navbar.css'

const Navbar = () => {
    return (
        <header className="header">
            <Link to="/" className="logo"><img href="../../assets/images/logo edgar.svg" /*TODO: debo colocar el logo*/  ></img></Link>
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