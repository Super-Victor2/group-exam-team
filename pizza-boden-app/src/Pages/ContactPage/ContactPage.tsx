import React from 'react';
import './contactPage.css'; // Se till att importera din CSS-fil


const ContactPage: React.FC = () => {
  return (
    <div className="contact-container">
      <div className="contact-item">
        <h2>Telefon</h2>
        <p>070-123 45 67</p>
      </div>
      <div className="contact-item">
        <h2>Email</h2>
        <p>example@mail.com</p>
      </div>
      <div className="contact-item">
        <h2>Adress</h2>
        <p>Exempelgatan 123, 111 22 Stockholm</p>
      </div>
    </div>
  );
};

export default ContactPage;
