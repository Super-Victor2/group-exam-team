import './CartComp.css';
import CartItemImg from '../../assets/pizzzzaaaa.jpg';
import { Link } from 'react-router-dom';
import useStore from '../useStore';

function CartComp() {
    const cart = useStore((state) => state.cart);
    const removeFromCart = useStore((state) => state.removeFromCart);
    const updateQuantity = useStore((state) => state.updateQuantity); // Get updateQuantity from store

    const handleIncrement = (id: number, quantity: number) => {
        // Increment the quantity of a specific item
        updateQuantity(id, quantity + 1);
    };

    const handleDecrement = (id: number, quantity: number) => {
        // Decrement the quantity of a specific item if quantity > 1
        if (quantity > 1) {
            updateQuantity(id, quantity - 1);
        }
    };

    return (
        <section className="cart-section">
            <h1 className="cart-section-title">Varukorg</h1>
            <section className="cart-section-wrapper">
                <aside className="cart-items">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <img
                                    className="cart-item-card-img"
                                    src={CartItemImg}
                                    alt="cart-img"
                                />
                                <aside className="cart-item-card-items-wrapper">
                                    <p className="cart-item-card-name">{item.name}</p>
                                    <aside className="items-selected-wrapper">
                                        <i
                                            onClick={() => handleDecrement(item.id, item.quantity)}
                                            className="cart-item cart-item-icon fa-solid fa-minus"
                                        ></i>
                                        <p className="cart-item cart-item-card-items-selected">
                                            {item.quantity} {/* Display item quantity */}
                                        </p>
                                        <i
                                            onClick={() => handleIncrement(item.id, item.quantity)}
                                            className="cart-item cart-item-icon fa-solid fa-plus"
                                        ></i>
                                    </aside>
                                    <p className="cart-item-card-price">{item.price}</p>
                                    <button onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </button>
                                </aside>
                            </div>
                        ))
                    ) : (
                        <div className="empty-text-wrapper">
                            <p className='empty-cart-text'>Your cart is empty</p>
                        </div>
                    )}
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
                        <Link to="/ShipmentInfoPage">
                            <button className="cart-total-btn">Fortsätt</button>
                        </Link>
                    </aside>
                </section>
            </section>
        </section>
    );
}

export default CartComp;