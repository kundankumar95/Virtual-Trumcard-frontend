import React from 'react';
import './Footer.css';
import pintester_icon from '../assets/image6.png';

const Footer = () => {
  return (
    <div className='footer'>
      <footer>
        <div className="footer_main">
          <div className="tag">
            <h1>Contact</h1>
            <a href="/"><i className="fa-solid fa-phone"></i>+919501234567</a>
            <a href="/"><i className="fa-solid fa-envelope"></i>GameZone@gmail.com</a>
          </div>
          <div className="tag">
            <h1>Follow Us</h1>
            <div className="social_link">
              <a href="https://www.facebook.com" rel="noopener noreferrer">
                <img src={pintester_icon} alt="Pinterest" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={pintester_icon} alt="Pinterest" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={pintester_icon} alt="Pinterest" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src={pintester_icon} alt="Pinterest" />
              </a>
            </div>
          </div>
          <div className="tag">
            <h1>Newsletter</h1>
            <div className="search_bar">
              <input type="text" placeholder="You email id here" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
