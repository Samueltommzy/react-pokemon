import { CircularProgress, Link, Typography } from '@material-ui/core';
import React, { useEffect, useState }from 'react'
import mockData from '../data';
import axios from 'axios';

import { capitalizeFirst } from './pokedex';

const  Pokemon = (props) => {
  const { match } = props;
  const { params} = match
  const { pokemonid }  = params;
  const [pokedexData,setPokedexData] = useState();

  useEffect(()=>{
    async function getPokemon(){
      const pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon/${pokemonid}/`);
      console.log(pokemon.data,'ddddddddddddd');
      setPokedexData(pokemon.data);
    }
    getPokemon();
  },[pokemonid])

  const displayPokemon = () => { 
    const { id, name, species, height, weight, types, sprites} = pokedexData;
    const pokemonImg = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
      <Typography variant = 'h1'>
        {`${id}. ${capitalizeFirst(name)}`}
        <img src = {front_default}></img>
      </Typography>
      <img src = {pokemonImg} style = {{height:'300px',width:'200px'}}></img>
      <Typography variant = 'h2'>
        Pokemon info
      </Typography>
      <Typography >
        {'Species: '}
        <Link href = {species.url}>{species.name}</Link>
      </Typography>
      <Typography >
        {`Weight: ${weight}`}
      </Typography>
      <Typography >
        {`Height: ${height}`}
      </Typography>
      <Typography variant = 'h6' >
        {`Types:`}
        {types?.map(t=>
          <Typography>{t['type'].name}</Typography>
          )
        }
      </Typography>
      </>
    )
  }
   return (
     <>
      {
        pokedexData ? (
          displayPokemon()
        )
        :
        <CircularProgress/>
      }
     </>
   )
}

export default Pokemon;
