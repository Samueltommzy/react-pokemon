import { AppBar, Card, CardContent, Grid, Toolbar,CircularProgress, CardMedia, Typography, TextField } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles((theme)=>({
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
  },
  searchContainer :{
    display : 'flex',
    backgroundColor:fade(theme.palette.common.white,0.2),
    // padding: '6px',
    margin:'8px'
  },
  searchIcon : {
    alignSelf : 'flex-end',
    marginBottom: '3px',
    marginLeft:'4px'
  },
  searchInput : {
    width: '200px',
    margin: '4px'
  }
}));

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
  const [filter, setFilter] = useState('');

  const { history } = props
  
  useEffect(()=>{
    async function getPokeData(){
      const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`);
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

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  }
  return (
    <>
    <AppBar position = 'static'>
      <Toolbar>
        <div className = {classes.searchContainer}>
          <Search className = {classes.searchIcon}/>
          <TextField className = {classes.searchInput} label ='Pokemon' variant = 'standard' onChange = {(e)=>handleSearchChange(e)} />
        </div>
      </Toolbar>
    </AppBar>
    {
      pokedexData ? (
        <Grid container spacing = {2} className = {classes.pokedexStyle}>
          {
            Object.keys(pokedexData).map((k,idx)=>{
              const {id,name} = pokedexData[k];
             
              const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;  
              return (pokedexData[k].name.includes(filter)||pokedexData[k].name.includes(filter.toLowerCase())) && <Grid item xs = {12} sm = {4} key = {id}>
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