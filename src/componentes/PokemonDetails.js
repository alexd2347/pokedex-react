import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = response.data;

        setPokemonDetails(pokemonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (!pokemonDetails) {
    return <div className='loading'>Loading...</div>;
  }

  const { name, sprites, types, height, weight, abilities, stats } = pokemonDetails;

  return (
    <div className='pokemon-details-container'>
      <div className='pokemon-details'>
        <div className={`pokemon-img ${types.length > 0 ? types[0].type.name : ''}`} key={id}>
          <h2 className='pokemon-name'>{name.toUpperCase()}</h2>
          <div className='pokemon-image-container'></div>
          <img src={sprites.other.home.front_default || sprites.other.dream_world.front_default || sprites.front_default} alt={name} className="pokemon-image" title="Por favor, dame tu código secreto. Así que si quieres dar. Mi corazón, mi alma, rápido. ¡Somos uno y uno!"
             />
          <p className="stat-label">{types.map((type) => type.type.name).join(', ')}</p>
          <p className="stat-label">Height: {height}</p>
          <p className="stat-label">Weight: {weight}</p>
          <div className="abilities-container">
            {abilities.map((ability, index) => (
              <div key={index} className="ability">
                {ability.ability.name}
              </div>
            ))}
          </div>
        </div>
        <div className='estadisticas'>
          {/*<h3 className='name-title'>Stats:</h3>*/}
          {stats.map((stat) => (
            <div key={stat.stat.name} className='estadistica-container'>
              <p className="stat-label-black">{stat.stat.name}: {stat.base_stat}</p>
              <div className="stat-bar">
                <div className={`bar ${stat.stat.name.toLowerCase()}`} style={{ width: `${stat.base_stat}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
