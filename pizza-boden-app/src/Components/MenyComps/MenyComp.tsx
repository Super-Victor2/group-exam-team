import { useState, useEffect } from 'react';
import './MenyComp.css';
import useStore from '../useStore';

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
    totalPrice: string;
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

const MenyComp = () => {
    const [menuItems, setMenuItems] = useState<menuCard[]>([]);
    const addToCart = useStore(state => state.addToCart);

    useEffect(() => {
        const getMenu = async () => {
            const items = await fetchMenu();
            setMenuItems(items);
        };
        getMenu();
    }, []);

    const handleAddToCart = (item: menuCard) => {
        console.log('Adding item to cart:', item);
        addToCart(item); 
    };

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
                                <div key={item.id} className="meny-card" onClick={() => handleAddToCart(item)}>
                                    <h2 className="meny-title">{item.name}</h2>
                                    <p className="meny-price">{item.price}</p>
                                    <p className="meny-description-title">Ingredienser</p>
                                    <p className="meny-class-title">Class</p>
                                    <p className="meny-description">{item.ingredients.join(', ')}</p>
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