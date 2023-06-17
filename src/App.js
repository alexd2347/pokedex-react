import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './componentes/Header';
import Sidebar from './componentes/Sidebar';
import PokemonContent from './componentes/PokemonContent';
import PokemonDetails from './componentes/PokemonDetails';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
      <div className="container">
        <Header handleCategorySelection={handleCategorySelection} />
        <div className='container-sidebar-content-details'>
          <Sidebar handleCategorySelection={handleCategorySelection} />
          <div className="main-content">
            <Routes>
              <Route
                path="/"
                element={<PokemonContent selectedCategory={selectedCategory} />}
              />
              <Route
                path="/category/:category"
                element={<PokemonContent selectedCategory={selectedCategory} />}
              />
              <Route path="/details/:id" element={<PokemonDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
