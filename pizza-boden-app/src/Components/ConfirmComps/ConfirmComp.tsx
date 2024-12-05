import './ConfirmComp.css'
import { Link } from 'react-router-dom';
import useStore from '../useStore';

function ConfirmComp() {
    const cart = useStore((state) => state.cart);
    
    return (
        <>
            <section className="confirm-section">
                <h1 className="confirm-section-title">Orderöversikt</h1>
                <section className="confirm-section-order-overview-wrapper">
                    <aside className="confirm-section-order-overview-text-wrapper">
                        <p className="order-overview-text-title">Namn</p>
                        <p className="order-overview-text-title">Mobilnummer</p>
                        <p className="order-overview-text-title">E-postadress</p>
                        <p className="order-overview-text-title">Adress</p>
                        <p className="order-overview-text-text">Förnamn Efternamn</p>
                        <p className="order-overview-text-text">054-XXX-XXX</p>
                        <p className="order-overview-text-text">mailadress@gmail.com</p>
                        <p className="order-overview-text-text">Gatugatan 6 654 62 Karlstad</p>
                    </aside>
                    <aside className="confirm-section-order-overview-items-wrapper">
                        <p className="order-overview-items-title">Varor</p>
                        <aside className="order-overview-items-wrapper">
                            {cart.length > 0 ? (
                                cart.map((item) => (
                                    <div key={item.id} className='order-overview-items'>
                                        <p className="order-overview-item-name-title">Namn</p>
                                        <p className="order-overview-item-name-title">Antal</p>
                                        <p className="order-overview-item-name-title">Klass</p>
                                        <p className="order-overview-item-name-title">Pris</p>
                                        <p className="order-overview-item-name">{item.name}</p>
                                        <p className="order-overview-item-name">{item.quantity}</p>
                                        <p className="order-overview-item-name">{item.class}</p>
                                        <p className="order-overview-item-name">{item.totalPrice}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-overview-items">
                                    <p className="empty-overview-items-text">Inga varor här</p>
                                </div>
                            )}
                        </aside>
                    </aside>
                </section>
                <button className="confirm-section-button">Godkänn</button>
                <Link to="/ShipmentInfoPage"><button className="confirm-section-button">Tillbaka</button></Link>
                
            </section>
        </>
    )
}

export default ConfirmComp

/**
 * Författare: Victor
 * Design till bekräftelse sidan, ska uppdateras med test data senare
 */