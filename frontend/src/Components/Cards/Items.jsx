import React from 'react';
 // Import any necessary CSS for styling

const Items = ({ id, image, title, price, children }) => {
  return (
    <div className="item-card" key={id}>
      <img src={image} alt={title} className="item-image" />
      <h3 className="item-title">{title}</h3>
      <p className="item-price">${price}</p>
      {children} {/* This allows for any children (like buttons) to be rendered here */}
    </div>
  );
};

export default Items;

