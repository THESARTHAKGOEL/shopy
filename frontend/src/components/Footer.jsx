import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <h4>About Us</h4>
          <p>We provide quality products at affordable prices.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: shop-cart@shop.com</p>
          <p>Phone: +91-1234567890</p>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} YourSiteName. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;