import './HeaderComp.css'
import { Link } from 'react-router-dom';

function HeaderComp() {
    return (
        <>
            <header className="navbar">
                <h1 className="navbar-title">Pizzaboden</h1>
                <ul className="navbar-list">
                    <Link to={'/'}><li className="navbar-item">Hem</li></Link>
                    <li className="navbar-item">Meny</li>
                    <li className="navbar-item">Beställ</li>
                    <Link to={'/AboutPage'}><li className="navbar-item">Om oss</li></Link>
                    <li className="navbar-item">Kontakta</li>
                </ul>
                <i className="menu fa-solid fa-bars"></i>
            </header>
        </>
    )
}

export default HeaderComp

/**
 * Författare: Victor
 * Design till headern och länkar till andra sidor
 */