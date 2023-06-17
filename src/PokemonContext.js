import React, { createContext, useState } from 'react';

// Crea el contexto
const PokemonContext = createContext();

// Crea el proveedor del contexto
const PokemonProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <PokemonContext.Provider value={{ searchQuery, handleSearch }}>
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
