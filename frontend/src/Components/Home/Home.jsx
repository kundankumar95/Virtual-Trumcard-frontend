import React from 'react'
import './Home.css'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.png'
import image3 from '../assets/image3.png'
import image4 from '../assets/image4.png'

const Home = () => {
  return (
    <div className="explore-container">
      <div className="branch-row">
        <h2>Explore Our Game</h2>
        <div className="subject-row">
          <div className="subject-card">
            <img src={image1} alt="#" />
          </div>
          <div className="subject-card">
            <img src={image2} alt="#" />
          </div>
          <div className="subject-card">
            <img src={image3} alt="#" />
          </div>
          <div className="subject-card">
            <img src={image4} alt="#" />
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Home
