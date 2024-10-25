import  { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css';
import logo from '../../assets/logo-removebg-preview.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="GameZone Logo" style={{ height: '50px', width: 'auto' }} />
        <p style={{ marginTop: '5px', color: '#ffffff', fontSize: '1rem' }}>BeingSarangi</p>
      </div>
      <div className="signup-button">
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => {
            localStorage.removeItem('auth-token');
            window.location.replace('/');
          }}>
            Logout
          </button>
        ) : (
          <Link to='/signup'>
            <button>Logout</button>
          </Link>
        )}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;

