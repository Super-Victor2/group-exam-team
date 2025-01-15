import './OrderComp.css';
import { useEffect, useState } from 'react';

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

async function fetchOrders(token: string): Promise<orderResponse[]> {
    try {
        const response = await fetch("https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/orders", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

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

function getTokenFromSessionStorage(): string {
    try {
        const token = sessionStorage.getItem('token') || '';
        console.log('token:', token);
        return token;
    } catch (error) {
        console.error('Error getting token');
        return '';
    }
}

function OrderComp() {
    const [orderItems, setOrderItems] = useState<orderResponse[]>([]);

    useEffect(() => {
        const getOrders = async () => {
            const token = getTokenFromSessionStorage();
            if (token) {
                const items = await fetchOrders(token);
                setOrderItems(items);
            } else {
                console.error('No authorization to enter!');
            }
        };
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
                            <p className="empty-cart-text">Inga beställningar lagda eller så är du inte inloggad!</p>
                        </div>
                    )}
                </aside>
            </section>
        </section>
    );
}

export default OrderComp;
