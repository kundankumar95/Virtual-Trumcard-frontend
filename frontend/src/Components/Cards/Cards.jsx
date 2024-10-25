import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cards.css'; 
import Item from './Items';

const Cards = () => {
  const navigate = useNavigate();
  const [newCard, setNewCard] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch latest 20 cards or search results based on searchTerm
    const fetchCards = () => {
      const url = searchTerm 
        ? `http://localhost:4000/newCards?search=${encodeURIComponent(searchTerm)}` 
        : 'http://localhost:4000/newCards';
      
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Log the response data
          setNewCard(data);
        })
        .catch((error) => {
          console.error('Error fetching cards:', error);
          setError('Failed to fetch cards. Please try again later.');
        });
    };

    fetchCards();
  }, [searchTerm]); // Re-run the effect if searchTerm changes

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted for:', searchTerm);
  };

  const handlePurchase = (price, cardTitle) => {
    navigate('/payment', { state: { amount: price, cardTitle: cardTitle } });
  };

  return (
    <>
      {/* Search form */}
      <form onSubmit={handleSubmit} className="search-form">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {/* Display cards */}
      <div className="cards-container">
        {newCard.length > 0 ? (
          newCard.map((card) => (
            <Item key={card.id} id={card.id} image={card.image} price={card.price}>
              <button className="buy-button" onClick={() => handlePurchase(card.price, card.title)}>
                Purchase
              </button>
            </Item>
          ))
        ) : (
          <p>No cards found.</p>
        )}
      </div>
    </>
  );
};

export default Cards;
