import './MenyComp.css'

function MenyComp() {
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
                        <div className="meny-card">
                            <h2 className="meny-title">Pizza</h2>
                            <p className="meny-prize">59kr</p>
                            <p className="meny-description">Pizza!</p>
                        </div>
                        <div className="meny-card">
                            <h2 className="meny-title">Pizza</h2>
                            <p className="meny-prize">59kr</p>
                            <p className="meny-description">Pizza!</p>
                        </div>
                        <div className="meny-card">
                            <h2 className="meny-title">Pizza</h2>
                            <p className="meny-prize">59kr</p>
                            <p className="meny-description">Pizza!</p>
                        </div>
                        <div className="meny-card">
                            <h2 className="meny-title">Pizza</h2>
                            <p className="meny-prize">59kr</p>
                            <p className="meny-description">Pizza!</p>
                        </div>
                        <div className="meny-card">
                            <h2 className="meny-title">Pizza</h2>
                            <p className="meny-prize">59kr</p>
                            <p className="meny-description">Pizza!</p>
                        </div>
                        <div className="meny-card">
                            <h2 className="meny-title">Pizza</h2>
                            <p className="meny-prize">59kr</p>
                            <p className="meny-description">Pizza!</p>
                        </div>
                    </section>
                </section>
                
            </section>
        </>
    )
}

export default MenyComp

/**
 * Författare: Victor
 * Design till meny sidan, ska uppdateras med test data senare
 */