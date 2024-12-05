import './CartComp.css';
import CartItemImg from '../../assets/pizzzzaaaa.jpg';
import { Link } from 'react-router-dom';
import useStore from '../useStore';

function CartComp() {
    const cart = useStore((state) => state.cart);
    const removeFromCart = useStore((state) => state.removeFromCart);
    const updateQuantity = useStore((state) => state.updateQuantity);

    const handleIncrement = (id: number, quantity: number) => {
        updateQuantity(id, quantity + 1);
    };

    const handleDecrement = (id: number, quantity: number) => {
        if (quantity > 1) {
            updateQuantity(id, quantity - 1);
        }
    };

    const totalCartValue = cart.reduce(
        (total, item) => total + parseFloat(item.totalPrice),
        0
    );

    const shippingCost = cart.length > 0 ? 59 : 0;
    const finalTotal = totalCartValue + shippingCost;

    return (
        <section className="cart-section">
            <h1 className="cart-section-title">Varukorg</h1>
            <section className="cart-section-wrapper">
                <aside className="cart-items">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <img className="cart-item-card-img" src={CartItemImg} alt="cart-img" />
                                <aside className="cart-item-card-items-wrapper">
                                    <p className="cart-item-card-name">{item.name}</p>
                                    <aside className="items-selected-wrapper">
                                        <i onClick={() => handleDecrement(item.id, item.quantity)} className="cart-item cart-item-icon fa-solid fa-minus"></i>
                                        <p className="cart-item cart-item-card-items-selected">{item.quantity}</p>
                                        <i onClick={() => handleIncrement(item.id, item.quantity)} className="cart-item cart-item-icon fa-solid fa-plus"></i>
                                    </aside>
                                    <p className="cart-item-card-price">{item.totalPrice} kr</p>
                                    <i onClick={() => removeFromCart(item.id)} className="cart-remove-item-icon fa-solid fa-x"></i>
                                </aside>
                            </div>
                        ))
                    ) : (
                        <div className="empty-text-wrapper">
                            <p className="empty-cart-text">Your cart is empty</p>
                        </div>
                    )}
                </aside>
                <section className="cart-total-value">
                    <h2 className="cart-total-value-title">Summering</h2>
                    <aside className="cart-total-value-text-wrapper">
                        <p className="cart-total-value-text">Summa:</p>
                        <p className="cart-total-value-text">{totalCartValue} kr</p>
                        <p className="cart-total-value-text">Frakt:</p>
                        <p className="cart-total-value-text">{shippingCost} kr</p>
                        <p className="cart-total-value-text">Total summa:</p>
                        <p className="cart-total-value-text">{finalTotal} kr</p>
                    </aside>
                    <aside className="cart-total-button-wrapper">
                        <Link className='cart-total-btn-link' to="/ShipmentInfoPage">
                            <button className="cart-total-btn">Fortsätt</button>
                        </Link>
                    </aside>
                </section>
            </section>
        </section>
    );
}

export default CartComp;
