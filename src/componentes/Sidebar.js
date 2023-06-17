import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sidebar.css';


import fire from './SVG/Fuego.svg'
import steel from './SVG/Acero.svg'
import water from './SVG/Agua.svg'
import bug from './SVG/Bicho.svg'
import dragon from './SVG/Dragon.svg'
import electric from './SVG/Electrico.svg'
import fairy from './SVG/Hada.svg'
import ghost from './SVG/Fantasma.svg'
import ice from './SVG/HIelo.svg'
import fighting from './SVG/Lucha.svg'
import normal from './SVG/Normal.svg'
import grass from './SVG/Planta.svg'
import psychic from './SVG/Psiquico.svg'
import rock from './SVG/Roca.svg'
import dark from './SVG/Siniestro.svg'
import ground from './SVG/Tierra.svg'
import poison from './SVG/Veneno.svg'
import flying from './SVG/Volaror.svg'




function Sidebar({ handleCategorySelection }) {
  const [categories, setCategories] = useState([]);
  const categorySVGs = {
    steel: steel,
    water: water,
    bug: bug,
    dragon: dragon,
    electric: electric,
    fairy: fairy,
    ghost: ghost,
    ice: ice,
    fighting: fighting,
    normal: normal,
    grass: grass,
    psychic: psychic,
    rock: rock,
    dark: dark,
    ground: ground,
    poison: poison,
    flying: flying,
    fire: fire
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        const categoryData = response.data.results;
        setCategories(categoryData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    handleCategorySelection(category);
  };


  const getCategoryColor = (categoryName) => {
    switch (categoryName) {
      case 'bug':
        return '#92bd10';
      case 'dark':
        return '#4b4b4b';
      case 'dragon':
        return '#7038f8';
      case 'electric':
        return '#ffcc00';
      case 'fairy':
        return '#e898e8';
      case 'fighting':
        return '#b80d4c';
      case 'fire':
        return '#ff6f00';
      case 'flying':
        return '#a88bff';
      case 'ghost':
        return '#6d4ca3';
      case 'grass':
        return '#6ec344';
      case 'ground':
        return '#e0c068';
      case 'ice':
        return '#58ffff';
      case 'normal':
        return '#c9cc72';
      case 'poison':
        return '#a040a0';
      case 'psychic':
        return '#ff3b76';
      case 'rock':
        return '#777777';
      case 'steel':
        return '#b9b9b9';
      case 'water':
        return '#477eff';
      default:
        return '';
    }
  };
  const filteredCategories = categories.slice(0, -2);

  return (
    <div className='sidebar'>
      <ul>
        {filteredCategories.map((category, index) => (
          <Link
            to={`/category/${category.name}`}
            key={index}
            className="link" // Cambia la clase CSS a "link"
          >
            <li
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              style={{ backgroundColor: getCategoryColor(category.name) }}
              className='contenedor-categoria'
            >
              <img className="img-ico-category" src={categorySVGs[category.name.toLowerCase()]} alt={category.name} />
              <div className='name-category'>{category.name.toUpperCase()}</div>
            </li>
          </Link>
        ))}

      </ul>
    </div>
  );

}

export default Sidebar;
