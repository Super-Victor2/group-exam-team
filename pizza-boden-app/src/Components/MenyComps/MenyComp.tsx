import { useState, useEffect } from 'react';
import './MenyComp.css';

window.addEventListener('load', () : void => {
    fetchMenu();
});

interface menuApiResponse {
    data: menuCard[];
}

interface menuCard {
    id: number;
    name: string;
    ingredients: string[];
    type: string,
    price: string;
    class: string;
    quantity: number;
}

interface sendOrder {
    name: string;
    ingredients: string[];
    type: string,
    price: string;
    class: string;
    quantity: number;
}

async function fetchMenu(): Promise<menuCard[]> {
    try {
        const response = await fetch("https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu");
        if (!response.ok) {
            throw new Error('Error fetching API');
        } else {
            const result: menuApiResponse = await response.json();
            console.log(result);
            return result.data;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function sendOrder(order: sendOrder): Promise<void> {
    try {
        console.log("Sending order with item:", order);

        const response = await fetch('https://kisczu4vrd.execute-api.eu-north-1.amazonaws.com/menu/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            throw new Error('Error posting order');
        } else {
            const result = await response.json();
            console.log('Order placed successfully', result);
        }
    } catch (error) {
        console.log('Error in sending order:', error);
    }
}



const MenyComp = () => {
    const [menuItems, setMenuItems] = useState<menuCard[]>([]);

    useEffect(() => {
        const getMenu = async () => {
            const items = await fetchMenu();
            setMenuItems(items);
        };
        getMenu();
    }, []);

    return (
        <>
            <section className="meny-section">
                <section className="meny-top-section">
                    <aside className="meny-top-section-text-wrapper">
                        <h1 className="meny-top-section-title">Meny</h1>
                        <h3 className="meny-top-section-under-title">Mat & Dricka</h3>
                    </aside>
                </section>
                <section className="meny-items-section-wrapper">
                    <section className="sort-section">
                        <button className="category-option">Kategori</button>
                        <button className="sort-option">Sortera</button>
                    </section>
                    <section className="meny-items-section">
                        {menuItems.length > 0 ? (
                            menuItems.map(item => (
                                <div key={item.id} className="meny-card" onClick={() => {
                                    const order: sendOrder = {
                                        name: item.name,
                                        ingredients: item.ingredients,
                                        type: item.type,
                                        price: item.price,
                                        class: item.class,
                                        quantity: 1,
                                    };
                                    sendOrder(order);
                                }}>
                                    <h2 className="meny-title">{item.name}</h2>
                                    <p className="meny-price">{item.price}</p>
                                    <p className="meny-description-title">Ingredienser</p>
                                    <p className="meny-class-title">Class</p>
                                    <p className="meny-description">{item.ingredients}</p>
                                    <p className="meny-class">{item.class}</p>
                                </div>
                            ))
                        ) : (
                            <p>Loading menu...</p>
                        )}
                    </section>
                </section>
            </section>
        </>
    );
};

export default MenyComp;


/**
 * Författare: Victor
 * Design till meny sidan, ska uppdateras med test data senare
 */