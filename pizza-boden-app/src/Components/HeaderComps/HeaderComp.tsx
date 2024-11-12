import './HeaderComp.css'

function HeaderComp() {
    return (
        <>
            <header className="navbar">
                <h1 className="navbar-title">Pizzaboden</h1>
                <ul className="navbar-list">
                    <li className="navbar-item">Hem</li>
                    <li className="navbar-item">Meny</li>
                    <li className="navbar-item">Beställ</li>
                    <li className="navbar-item">Om oss</li>
                    <li className="navbar-item">Kontakta</li>
                </ul>
                <i className="menu fa-solid fa-bars"></i>
            </header>
        </>
    )
}

export default HeaderComp