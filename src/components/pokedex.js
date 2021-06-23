import { AppBar, Card, CardContent, Grid, Toolbar,CircularProgress, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
import mockData from '../data';
import axios from 'axios';

const useStyles = makeStyles({
  pokedexStyle :{
    paddingLeft: '30px',
    paddingTop : '20px',
    paddingRight: '30px'
  },
  cardMedia :{
    margin: 'auto'
  },
  cardContent:{
    textAlign: 'center'
  }
});

/**
 * capitalize first letter
 * @param {String} data 
 */
export const capitalizeFirst = (data) => {
  return data.toLowerCase().replace(data[0],data[0].toUpperCase())
}
const Pokedex = (props) => {
  const classes = useStyles();
  const [pokedexData,setPokedexData] = useState({});
  const { history } = props
  // const getPokemonCard = (id) => {
  //   console.log(id)
  //   const data = pokedexData[id]
  //   const sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png";
  //   return <Grid item xs = {12} sm = {4} key = {id}>
  //     <Card>
  //       <CardMedia
  //         image ={sprite}
  //         style = {{width:'120px',height:'120px'}}
  //       /> 
  //       <CardContent>
  //         {1}
  //       </CardContent>
  //     </Card>
  //   </Grid> 
  // }
  useEffect(()=>{
    async function getPokeData(){
      const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`);
      console.log(pokemonData.data)
      const pokeData = {};
      pokemonData.data.results.forEach((pokemon,index)=>{
        pokeData[index+1] = {
          id : index + 1,
          name : pokemon.name,
          sprite : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
        }
      });
      setPokedexData(pokeData);
    }
    getPokeData();
  },[])
  return (
    <>
    <AppBar position = 'static'>
      <Toolbar></Toolbar>
    </AppBar>
    {
      pokedexData ? (
        <Grid container spacing = {2} className = {classes.pokedexStyle}>
          {
            Object.keys(pokedexData).map((k,idx)=>{
              const {id,name} = pokedexData[k];
             
              const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
              return <Grid item xs = {12} sm = {4} key = {id}>
                <Card onClick = {()=>history.push(`/${id}`)}>
                  <CardMedia
                    className = {classes.cardMedia}
                    image ={sprite}
                    style = {{width:'120px',height:'120px'}}
                  /> 
                  <CardContent className = {classes.cardContent}>
                    <Typography>{`${id}. ${capitalizeFirst(name)}`}</Typography>
                  </CardContent>
                </Card>
              </Grid> 
            })
          }
        </Grid>
      ):
      <CircularProgress/>
    }
    </>
  )
}

export default Pokedex;