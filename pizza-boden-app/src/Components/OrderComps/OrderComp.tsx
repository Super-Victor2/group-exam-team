import './OrderComp.css';
import { useEffect, useState } from 'react';

interface orderApiResponse {
    data: orderResponse[];
}

interface orderResponse {
    items: orderCard[];
    orderId: string;
    totalPrice: string;
    status: string;
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
    status: string;
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

    const handleDelete = async (orderId: string) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert('Ingen token hittades. Vänligen logga in igen.');
            return;
        }
    
        try {
            const response = await fetch(`https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/delete/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                alert("Order borttagen!");
                window.location.reload();
            } else {
                alert("Kunde inte ta bort order");
            }
        } catch (error) {
            console.error("Error deleting order", error);
        }
    };
       
    
    const handleUpdate = async (orderId: string) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            alert('Ingen token hittades. Vänligen logga in igen.');
            return;
        }

        try {
            const response = await fetch(`https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },    
            });

            if (response.ok) {
                alert("Order uppdaterad!");
                window.location.reload();
            } else {
                alert("Kunde inte uppdatera order");
            }
                
        } catch (error) {
            console.error("Error updating order", error);
        }
    }

    return (
        <section className="order-section">
            <h1 className="order-section-title">Beställningar</h1>
            <section className="order-section-wrapper">
                <aside className="order-items">
                    {orderItems.length > 0 ? (
                        orderItems.map(order => (
                            <div key={order.orderId} className="order-card">
                                <aside className="order-card-top-text">
                                    <h2 className="order-card-id">Order ID: {order.orderId}</h2>
                                    <i onClick={() => handleDelete(order.orderId)} className="order-card-delete-icon fa-solid fa-x"></i>
                                </aside>
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
                                <aside className="order-card-bottom-text">
                                    <p className="order-total-price">Total Price: {order.totalPrice}</p>
                                    <p className="order-total-price">Status: {order.status}</p>
                                </aside>
                                <button onClick={() => handleUpdate(order.orderId)} className="order-card-confirm-btn">Confirm</button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-text-wrapper">
                            <p className="empty-cart-text">Bara anställda kan se beställningar!</p>
                        </div>
                    )}
                </aside>
            </section>
        </section>
    );
}

export default OrderComp;
