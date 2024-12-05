import './CartComp.css';
import CartItemImg from '../../assets/pizzzzaaaa.jpg';
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

function CartComp() {
    const [orderItems, SetOrderItems] = useState<orderCard[]>([]);
    
    useEffect(() => {
        const getOrders = async () => {
            const items = await fetchOrders();
            SetOrderItems(items);
        }
        getOrders();
    }, []);

    return (
        <section className="cart-section">
            <h1 className="cart-section-title">Varukorg</h1>
            <section className="cart-section-wrapper">
                <aside className="cart-items">
                    {orderItems.length > 0 ? (
                        orderItems.map(item => (
                            <div key={item.name} className="cart-item-card">
                                <img className="cart-item-card-img" src={CartItemImg} alt="cart-img" />
                                <aside className="cart-item-card-items-wrapper">
                                    <p className="cart-item-card-name">{item.name}</p>
                                    <aside className="items-selected-wrapper">
                                        <i className="cart-item cart-item-icon fa-solid fa-minus"></i>
                                        <p className="cart-item cart-item-card-items-selected">{item.quantity}</p>
                                        <i className="cart-item cart-item-icon fa-solid fa-plus"></i>
                                    </aside>
                                    <p className="cart-item-card-price">{item.price}</p>
                                    <i  className="cart-remove-item-icon fa-solid fa-x"></i>
                                </aside>
                            </div>
                        ))
                    ) : (
                        <div className="empty-text-wrapper">
                            <p className="empty-cart-text">Inget i varukorgen <br/> Klicka på en vara för att köpa!</p>
                        </div>
                    )}
                        
                    
                    
                </aside>
                <section className="cart-total-value">
                    <h2 className="cart-total-value-title">Summering</h2>
                    <aside className="cart-total-value-text-wrapper">
                        <p className="cart-total-value-text">Summa:</p>
                        <p className="cart-total-value-text"> kr</p>
                        <p className="cart-total-value-text">Frakt:</p>
                        <p className="cart-total-value-text"> kr</p>
                        <p className="cart-total-value-text">Total summa:</p>
                        <p className="cart-total-value-text"> kr</p>
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
