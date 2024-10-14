import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cards.css'; 
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';

const Cards = () => {
  const navigate = useNavigate();
  
  const cardData = [
    { id: 1, image: image2, title: 'CardTitle1', description: 'This is a description for Card 1.', price: 1 },
    { id: 2, image: image2, title: 'Card Title 2', description: 'This is a description for Card 2.', price: 29.99 },
    { id: 3, image: image3, title: 'Card Title 3', description: 'This is a description for Card 3.', price: 39.99 },
    { id: 4, image: image2, title: 'Card Title 1', description: 'This is a description for Card 1.', price: 19.99 },
    { id: 5, image: image2, title: 'Card Title 2', description: 'This is a description for Card 2.', price: 29.99 },
    { id: 6, image: image3, title: 'Card Title 3', description: 'This is a description for Card 3.', price: 39.99 },
    { id: 7, image: image2, title: 'Card Title 1', description: 'This is a description for Card 1.', price: 19.99 },
    { id: 8, image: image2, title: 'Card Title 2', description: 'This is a description for Card 2.', price: 29.99 },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = cardData.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <div className="cards-container">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div key={card.id} className="card">
              <img src={card.image} alt={card.title} />
              {/* <h2>{card.title}</h2> */}
              <p>{card.description}</p>
              <strong>${card.price.toFixed(2)}</strong>
              <button className="buy-button" onClick={() => handlePurchase(card.price, card.title)}>
                Purchase
              </button>
            </div>
          ))
        ) : (
          <p>No cards found.</p>
        )}
      </div>
    </>
  );
};

export default Cards;

