import './ConfirmComp.css'
import { Link } from 'react-router-dom';
import useStore from '../useStore';

interface OrderApiResponse {
    message: string;
    order: Order;
}

interface Order {
    orderId: string;
    items: sendOrder[];
    totalPrice: string;
}

interface sendOrder {
    id: number;
    name: string;
    ingredients: string[];
    type: string;
    price: string;
    class: string;
    quantity: number;
}

async function sendOrderToDb(order: Order): Promise<void> {
    try {
        console.log("Sending order with ID:", order.orderId, "and items:", order.items);

        console.log("Order:", JSON.stringify(order, null, 2));

        const response = await fetch('https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        });

        console.log(response);

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || 'Error posting order');
        } else {
            const result: OrderApiResponse = await response.json();
            console.log('Order placed successfully', result);
        }
    } catch (error) {
        console.log('Error in sending order:', error);
    }
}


function ConfirmComp() {
    const cart = useStore((state) => state.cart);

    const handleSubmitOrder = () => {
        const orderId = Date.now().toString();

        const order: Order = {
            orderId,
            items: cart.map((item) => ({
                id: item.id,
                name: item.name,
                ingredients: item.ingredients || [],
                type: item.type,
                price: item.price,
                class: item.class,
                quantity: item.quantity,
            })),
            totalPrice: (cart.reduce((total, item) => total + parseFloat(item.totalPrice.replace('kr', '')), 0)).toFixed(0) + "kr", // Add 'kr' suffix
        };
        sendOrderToDb(order);
    };

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
                <button
                    className="confirm-section-button" onClick={handleSubmitOrder}>Godkänn</button>

                <Link to="/ShipmentInfoPage"><button className="confirm-section-button">Tillbaka</button></Link>
            </section>
        </>
    );
}

export default ConfirmComp;
