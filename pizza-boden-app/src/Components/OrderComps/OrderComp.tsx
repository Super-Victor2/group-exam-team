import './OrderComp.css'
import { useEffect, useState } from 'react';

window.addEventListener('load', () : void => {
    fetchOrders();
});

interface orderApiResponse {
    data: orderResponse[];
}

interface orderResponse {
    items: orderCard[];
    orderId: string;
    totalPrice: string;
}

interface orderCard {
    id: number;
    name: string;
    ingredients: string[];
    type: string;
    price: string;
    class: string;
    quantity: number;
    totalPrice: string;
}

async function fetchOrders(): Promise<orderResponse[]> {
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
    const [orderItems, SetOrderItems] = useState<orderResponse[]>([]);
    
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
                        orderItems.map(order => (
                            <div key={order.orderId} className="order-card">
                                <h2 className="order-card-id">Order ID: {order.orderId}</h2>
                                {order.items.map(item => (
                                    <div key={item.id} className="order-item">
                                        <aside className="order-card-wrapper">
                                            <p className="order-card-name">{item.name}</p>
                                            <p className="order-card-ingredients">{item.ingredients.join(', ')}</p>
                                            <p className="order-card-quantity">Quantity: {item.quantity}</p>
                                            <p className="order-item-card-price">{item.price}</p>
                                        </aside>
                                    </div>
                                ))}
                                <p className="order-total-price">Total Price: {order.totalPrice}</p>
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

export default OrderComp;
