import React, { useState, useEffect } from 'react';
import './Hislider.css';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';

const images = [image1, image2, image3, image4, image5, image6];

const Hislider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='slider'>
      <figure>
        <div className='border-top'></div>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        <div className='border-bottom'></div>
      </figure>
    </div>
  );
};

export default Hislider;

