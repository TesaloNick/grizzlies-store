import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Catalog from './components/Catalog/Catalog'
import Footer from './components/Footer/Footer'


function App() {
  return (
    <div className="App">
      <Header />
      <Catalog />
      <Footer />
   </div>
  );
}

export default App;
