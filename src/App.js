import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // App initialization
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
