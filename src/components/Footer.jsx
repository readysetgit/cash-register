import React from 'react';
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2023 Fahad S. Ahmad</p>
        <p>
          <a href="https://www.whoisfahad.com" target="_blank" rel="noopener noreferrer">
            More About me
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;