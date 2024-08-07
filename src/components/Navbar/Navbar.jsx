import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';

const Navbar = () => {
    const { isLoggedIn, user } = useContext(SessionContext);

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="nav-link navbar-brand fuenteGrande" to="/">PuniSports</Link>
                    <div className="centrado" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link navbar-brand" to="productos">Productos</NavLink>
                            </li>
                            {(user.rol === "user" && isLoggedIn) ? 
                                <li className="nav-item">
                                    <NavLink className="nav-link navbar-brand" to="carrito">Carrito</NavLink>
                                </li> : <></>}
                            {((user.rol === "admin" || user.rol === "premium") && isLoggedIn) ?
                                <li className="nav-item">
                                    <NavLink className="nav-link navbar-brand" to="misProductos">Mis Productos</NavLink>
                                </li> : <></>}
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link navbar-brand" to="perfil">Perfil</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link navbar-brand" to="logout">Logout</NavLink>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <NavLink className="nav-link navbar-brand" to="login">Login</NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar