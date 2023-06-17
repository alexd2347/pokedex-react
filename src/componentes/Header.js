import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import pokemonLogo from './logo.png';

function Header({ handleCategorySelection, handleSearch }) {
  const [id, setId] = useState('');

  const handleInputChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(id);
    setId(''); // Vaciar el input después del submit
  };

  const handleCategoryClick = (category) => {
    handleCategorySelection(category);
  };

  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>
          <img
            className='img-logo'
            src={pokemonLogo}
            alt='Pokémon Logo'
            onClick={() => handleCategoryClick(null)}
          />
        </Link>
      </div>
      <div className='search'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Buscar Pokémon por nombre o ID'
            value={id}
            onChange={handleInputChange}
          />
          <Link to={`/details/${id}`}>
            <button type='submit'>
              Buscar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Header;
