// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/Home';
import './App.css';
import Footer from './components/Footer';


const App = () => {
  return (<>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<HomePage />} />
      </Routes>
    </Router>
    <Footer />
  </>
  );
};

export default App;
