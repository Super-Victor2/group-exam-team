import './ConfirmComp.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

window.addEventListener('load', () : void => {
    fetchOrders();
});

interface orderApiResponse {
    data: orderCard[];
}

interface orderCard {
    name: string;
    ingredients: string[];
    type: string,
    price: string;
    class: string;
    quantity: number;
}

async function fetchOrders(): Promise<orderCard[]> {
    try {
        const response = await fetch("https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/orders");
        if (!response.ok) {
            throw new Error('Error fetching API');
        } else {
            const result: orderApiResponse = await response.json();
            console.log(result);
            return result.data;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

function ConfirmComp() {
    const [orderItems, SetOrderItems] = useState<orderCard[]>([]);
    
    useEffect(() => {
        const getOrders = async () => {
            const items = await fetchOrders();
            SetOrderItems(items);
        }
        getOrders();
    }, []);
    
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
                            {orderItems.length > 0 ? (
                                orderItems.map((item) => (
                                    <div key={item.name} className='order-overview-items'>
                                        <p className="order-overview-item-name-title">Namn</p>
                                        <p className="order-overview-item-name-title">Antal</p>
                                        <p className="order-overview-item-name-title">Klass</p>
                                        <p className="order-overview-item-name-title">Pris</p>
                                        <p className="order-overview-item-name">{item.name}</p>
                                        <p className="order-overview-item-name">{item.quantity}</p>
                                        <p className="order-overview-item-name">{item.class}</p>
                                        <p className="order-overview-item-name">{item.price}</p>
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