import './HomeComp.css'
import { Link } from 'react-router-dom';

function HomeComp() {
    return (
        <>
            <section className="home-section">
                <h1 className="home-section-title">Pizzaboden</h1>
                <Link to="/MenyPage"><button className="home-section-btn">Meny</button></Link>
            </section>
        </>
    )
}

export default HomeComp

/**
 * Författare: Victor
 * Design till hem sidan
 * Fix: Länkar till meny
 */