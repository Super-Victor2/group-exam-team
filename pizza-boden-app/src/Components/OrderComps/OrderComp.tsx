import './OrderComp.css'
import { useEffect, useState } from 'react';
import CartItemImg from '../../assets/pizzzzaaaa.jpg';

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

function OrderComp() {
    const [orderItems, SetOrderItems] = useState<orderCard[]>([]);
    
    useEffect(() => {
        const getOrders = async () => {
            const items = await fetchOrders();
            SetOrderItems(items);
        }
        getOrders();
    }, []);

    return (
        <section className="order-section">
            <h1 className="order-section-title">Beställningar</h1>
            <section className="order-section-wrapper">
                <aside className="order-items">
                    {orderItems.length > 0 ? (
                        orderItems.map(item => (
                            <div key={item.name} className="order-card">
                                <img className="order-card-img" src={CartItemImg} alt="cart-img" />
                                <aside className="order-card-wrapper">
                                    <p className="order-card-name">{item.name}</p>
                                    <p className="order-card-ingredients">{item.ingredients}</p>
                                    <p className="order-card-quantity">{item.quantity}</p>
                                    <p className="order-item-card-price">{item.price}</p>
                                    <i className="order-remove-item-icon fa-solid fa-x"></i>
                                </aside>
                            </div>
                        ))
                    ) : (
                        <div className="empty-text-wrapper">
                            <p className="empty-cart-text">Inga beställningar lagda!</p>
                        </div>
                    )}
                </aside>
            </section>
        </section>
    );
}

export default OrderComp