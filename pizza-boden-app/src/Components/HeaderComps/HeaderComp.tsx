import './HeaderComp.css'
import { Link } from 'react-router-dom';

function HeaderComp() {
    return (
        <>
            <header className="navbar">
                <h1 className="navbar-title">Pizzaboden</h1>
                <ul className="navbar-list">
                    <Link to={'/'}><li className="navbar-item">Hem</li></Link>
                    <Link to={'/MenyPage'}><li className="navbar-item">Meny</li></Link>
                    <Link to={'/OrdersPage'}><li className="navbar-item">Beställningar</li></Link>
                    <Link to={'/UpdatePage'}><li className="navbar-item">Updatera</li></Link>
                    <Link to={'/AboutPage'}><li className="navbar-item navbar-item-about">Om oss</li></Link>
                    <li className="navbar-item">Kontakta</li>
                    <Link to={'/LogInPage'}><li className="navbar-item navbar-item-login">Login</li></Link>
                    <Link to={'/RegisterPage'}><li className="navbar-item navbar-item-login">Signup</li></Link>
                    <Link to={'/CartPage'}><i className="navbar-item fa-solid fa-cart-shopping"></i></Link>
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
 * Fix: La till varukorg länk och tog bort beställ
 */