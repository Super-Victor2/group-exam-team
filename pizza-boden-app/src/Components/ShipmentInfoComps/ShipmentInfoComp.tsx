import './ShipmentInfoComp.css'
import { Link } from 'react-router-dom';

function ShipmentInfoComp() {
    return (
        <>
            <section className="shipment-info-section">
                <h1 className="shipment-info-section-title">Leveransinformation</h1>
                <aside className="shipment-info-inputs-wrapper">
                    <input type="text" placeholder='Förnamn' className="shipment-info-input" />
                    <input type="text" placeholder='Efternamn' className="shipment-info-input" />
                    <input type="text" placeholder='Mobilnummer' className="shipment-info-input" />
                    <input type="text" placeholder='E-postadress' className="shipment-info-input" />
                    <input type="text" placeholder='Gatuadress' className="shipment-info-input" />
                    <input type="text" placeholder='Postnummer' className="shipment-info-input" />
                    <input type="text" placeholder='Stad' className="shipment-info-input" />
                </aside>
                <Link to="/ConfirmPage"><button className="shipment-info-btn shipment-info-continue-btn">Fortsätt</button></Link>
                <Link to="/CartPage"><button className="shipment-info-btn shipment-info-back-btn">Tillbaka</button></Link>
                
                
            </section>
        </>
    )
}

export default ShipmentInfoComp

/**
 * Författare: Victor
 * Design till leverans info sidan, ska uppdateras med test data senare
 */