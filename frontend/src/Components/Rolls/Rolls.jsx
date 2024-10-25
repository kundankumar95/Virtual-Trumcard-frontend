import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Rolls.css';

const Points = () => {
  const pointsArray = [1, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100];
  const pointValue = 10;
  const navigate = useNavigate();

  const handlePurchase = (price, numberOfPoints) => {
    navigate('/payment', { state: { amount: price, numberOfPoints } });
  };

  return (
    <div>
      <h2>Rolls Table</h2>
      <table className="points-table">
        <thead>
          <tr>
            <th>Rolls</th>
            <th>Rupees</th>
            <th>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {pointsArray.map((point) => (
            <tr key={point}>
              <td>{point}</td>
              <td>{point * pointValue}</td>
              <td>
                <button 
                  className="buy-button" 
                  onClick={() => handlePurchase(point * pointValue, point)}
                >
                  Buy Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Points;