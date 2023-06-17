import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PokemonContent.css';

function PokemonContent({ selectedCategory }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        if (selectedCategory) {
          const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedCategory.toLowerCase()}`);
          const pokemonUrls = response.data.pokemon.map((pokemon) => pokemon.pokemon.url);
          const pokemonData = await Promise.all(
            pokemonUrls.map(async (url) => {
              const res = await axios.get(url);
              return res.data;
            })
          );
          setPokemonList(pokemonData);
        } else {
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
          const results = response.data.results;
          const pokemonData = await Promise.all(
            results.map(async (pokemon) => {
              const res = await axios.get(pokemon.url);
              return res.data;
            })
          );
          setPokemonList(pokemonData);
          setOffset(20);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonList();
  }, [selectedCategory]);

  const loadMorePokemon = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const results = response.data.results;
      setOffset((prevOffset) => prevOffset + 20);

      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setPokemonList((prevList) => [...prevList, ...pokemonData]);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div className='pokemon-content'>
      <h2>Pokedex</h2>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <Link
            to={`/details/${pokemon.id}`}
            className={`contenedor-lista-pokemones type ${pokemon.types[0]?.type.name}`}
            key={index}
          >
            <li>
              <img src={pokemon.sprites.other.home.front_default || pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default} alt={pokemon.name} className='img-pokemon-content'/>
              <h3>{pokemon.name.toUpperCase()}</h3>
              <div className='tipos-pokemon-contenedor'>
                {pokemon.types.map((type, index) => (
                  <p key={index} className={`type ${type.type.name}`}>
                    {type.type.name.toUpperCase()}
                  </p>
                ))}
              </div>
            </li>
          </Link>
        ))}
      </ul>
      {isLoading && <p>Loading more pokémon...</p>}
      {!isLoading && pokemonList.length > 0 && pokemonList.length % 10 === 0 && (
        <button onClick={loadMorePokemon}>Load More</button>
      )}
    </div>
  );
}

export default PokemonContent;
