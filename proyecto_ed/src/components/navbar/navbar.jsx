import react from "react";
import logo from "../../assets/images/logo1.jpg"
import style from './navbar.css'

const Navbar = () => {
    return (
        <nav style={style.Navbar}>
            <div>
                <link><img 
                src={logo}
                alt="logotipo" /></link>
            </div>
            <ul>
                <li><link to="/src/pages/productos.jsx">Productos</link></li>
                <li><link to="/src/pages/pedidos.jsx">Pedidos</link></li>
                <li><link to="/src/pages/otros_servicios.jsx">Otros Servivios</link></li>
                <li><link to="/src/pages/contacto.jsx">Contacto</link></li>
                <li><link to="/src/pages/inicio_de_sesion.jsx">Iniciar Sesión</link></li>
            </ul>
        </nav>
    )
}

export default Navbar