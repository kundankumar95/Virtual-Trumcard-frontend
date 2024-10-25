import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './Components/Services/Services';
import Feedback from './Components/Feedback/Feedback';
import Footer from './Components/Footer/Footer';
import Hislider from './Components/Hislider/Hislider';
import Signup from './Components/Signuppage/Signup';
import Cards from './Components/Cards/Cards';
import Payment from './Components/Payment/Payment';
import Success from './Components/Success/Success';
import Points from './Components/Points/Points';
import Rolls from './Components/Rolls/Rolls';

const Layout = ({ children, showFooter = false, noLayout = false }) => {
  if (noLayout) {
    return <div>{children}</div>;
  }
  
  return (
    <div>
      <Navbar />
      <Hislider />
      {children}
      {showFooter && <Services />}
      {showFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Layout showFooter={true}><Home /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
      <Route path="/contact" element={<Layout><Footer /></Layout>} />
      <Route path="/cards" element={<Layout><Cards /></Layout>} />
      <Route path="/points" element={<Layout><Points /></Layout>} />
      <Route path="/rolls" element={<Layout><Rolls /></Layout>} />
      <Route path="/payment" element={<Layout><Payment /></Layout>} />
      <Route path="/success" element={<Layout noLayout={true}><Success /></Layout>} />
    </Routes>
  );
}

function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Main;



