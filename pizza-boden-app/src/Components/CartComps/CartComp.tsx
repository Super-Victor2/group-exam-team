import './CartComp.css'
import CartItemImg from '../../assets/pizzzzaaaa.jpg'
import { Link } from 'react-router-dom';

function CartComp() {
    return (
        <>
            <section className="cart-section">
                <h1 className="cart-section-title">Varukorg</h1>
                <section className="cart-section-wrapper">
                    <aside className="cart-items">
                        <div className="cart-item-card">
                            <img className='cart-item-card-img' src={CartItemImg} alt="cart-img" />
                            <aside className="cart-item-card-items-wrapper">
                            <p className="cart-item-card-name">Pizza</p>
                            <aside className="items-selected-wrapper">
                                <i className="cart-item cart-item-icon fa-solid fa-minus"></i>
                                <p className="cart-item cart-item-card-items-selected">1</p>
                                <i className="cart-item cart-item-icon fa-solid fa-plus"></i>
                            </aside>
                            <p className="cart-item-card-price">59kr</p>
                            </aside>
                        </div>
                    </aside>
                    <section className="cart-total-value">
                        <h2 className="cart-total-value-title">Summering</h2>
                        <aside className="cart-total-value-text-wrapper">
                            <p className="cart-total-value-text">Summa:</p>
                            <p className="cart-total-value-text">123kr</p>
                            <p className="cart-total-value-text">Frakt:</p>
                            <p className="cart-total-value-text">59kr</p>
                            <p className="cart-total-value-text">Total summa:</p>
                            <p className="cart-total-value-text">123kr</p>
                        </aside>
                        <aside className="cart-total-button-wrapper">
                            <Link to="/ShipmentInfoPage"><button className="cart-total-btn">Fortsätt</button></Link>
                        </aside>
                    </section>
                </section>
            </section>
        </>
    )
}

export default CartComp

/**
 * Författare: Victor
 * Design till cart sidan, ska uppdateras med test data senare
 */