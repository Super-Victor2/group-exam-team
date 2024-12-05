
const ContactUs = () => {
    return (
        <div style={styles.container}>
            {/* Bild och text över "Kontakta oss"-informationen */}
            <div style={styles.imageContainer}>
                <img
                    src="https://via.placeholder.com/1200x400" // Byt till en riktig bildlänk
                    alt="Kontakta oss bild"
                    style={styles.image}
                />
            </div>
            <h2 style={styles.text}>Vi ser fram emot att höra från dig!</h2>
            {/* Kontakta oss information längst ner */}
            <div style={styles.contactInfo}>
                <p>📞 Telefon: +46 70 123 45 67</p>
                <p>✉️ E-post: info@randommail.com</p>
                <p>📍 Adress: Randomgatan 123, 123 45 Stockholm</p>
            </div>
        </div>
    );
};

// Enkel styling
const styles = {
    container: {
        textAlign: "center", // Här användes rätt syntax med dubbelcitat
        fontFamily: "Arial, sans-serif",
        margin: "20px auto",
        padding: "20px",
    },
    imageContainer: {
        marginBottom: "20px",
    },
    image: {
        width: "100%",
        height: "auto",
        borderRadius: "8px",
    },
    text: {
        fontSize: "24px",
        margin: "20px 0",
        color: "#333",
    },
    contactInfo: {
        marginTop: "30px",
        fontSize: "18px",
        color: "#555",
    },
};

export default ContactUs;
