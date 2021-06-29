import { CircularProgress, Grid, IconButton, Link, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState }from 'react'
import axios from 'axios';

import { capitalizeFirst } from './pokedex';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles({
  topSpace:{
    marginBottom : '70px'
  },
  pokemonName : {
    color: '#87ceeb',
    // marginTop : '3px',
    fontStyle: 'bold'
  },
  pokemomInfo :{
    margin: '10px',
    color: 'green',
    fontSize: '12px'
  },
  pokemonTypes:{
    margin : '5px',
    color: 'red',
    fontSize: '12px'
  },
  pokemonImage:{
    margin: '5px'
  }
})

const  Pokemon = (props) => {
  const { match, history } = props;
  const { params} = match
  const { pokemonid }  = params;
  const [pokedexData,setPokedexData] = useState();
  const classes = useStyles();

  useEffect(()=>{
    async function getPokemon(){
      const pokemon = await axios.get( `https://pokeapi.co/api/v2/pokemon/${pokemonid}/`);
      console.log(pokemon.data,'ddddddddddddd');
      setPokedexData(pokemon.data);
    }
    getPokemon();
  },[pokemonid]);

 

  const displayPokemon = () => { 
   
    const { id, name, species, height, weight, types, sprites} = pokedexData;
    const pokemonImg = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default,back_default,front_shiny } = sprites
    return (
      <>
      <Grid container>
        <Grid item xs = {12} className = {classes.topSpace}> 
         
        </Grid>  
          <Grid container item>
            <Grid item xs = {1} sm = {2}  md = {3}>
            </Grid> 
            <Grid item xs = {10} sm = {8} md = {6}>
              <Paper>
                <Grid container item>
                  <Grid item xs = {4}>
                    <IconButton
                      onClick = {()=>history.push('/')}
                     >
                      <ArrowBack/>
                    </IconButton>
                  </Grid> 
                  <Grid item xs = {6}>
                    <Typography variant = 'h4' className = {classes.pokemonName}>
                      {`${capitalizeFirst(name)}`}
                      <img src = {front_default} alt = ''></img>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item>
                  <Grid item xs = {4}>
                    <img src = {pokemonImg} style = {{height:'300px',width:'200px'}} alt = '' className = {classes.pokemonImage}></img>
                  </Grid>
                  <Grid item xs = {4}>
                    <img src = {back_default} style = {{height:'300px',width:'200px'}} alt = '' className = {classes.pokemonImage}></img>
                  </Grid>
                  <Grid item xs = {4}>
                    <img src = {front_shiny} style = {{height:'300px',width:'200px'}} alt = '' className = {classes.pokemonImage}></img>
                  </Grid>
                </Grid>
                <Typography variant = 'h2' className = {classes.pokemonName}>
                  Pokemon info
                </Typography>
                <Grid container item className = {classes.pokemomInfo}>
                  <Grid item xs = {4}>
                    <Typography >
                      {'Species: '}
                      <Link href = {species.url}>{species.name}</Link>
                    </Typography>
                  </Grid> 
                  <Grid item xs = {4}>
                    <Typography >
                      {`Weight: ${weight}kg`}
                    </Typography>
                  </Grid> 
                  <Grid item xs = {4}>
                  <Typography >
                  {`Height: ${height}cm`}
                  </Typography>
                  </Grid>
                </Grid>
                <Typography variant = 'h3' className = {classes.pokemonName}>Types</Typography>
                <Grid container item>
                  {types?.map(t=>
                      <Grid item xs = {2} className = {classes.pokemonTypes}>
                          <Typography variant = 'h6'>{t['type'].name}</Typography>
                      </Grid>
                    )
                  }
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs = {1} sm = {2} md = {3}>
            </Grid>
          </Grid>
       
      </Grid>
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
