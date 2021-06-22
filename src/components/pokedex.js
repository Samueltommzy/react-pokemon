import { AppBar, Card, CardContent, Grid, Toolbar,CircularProgress, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'
import mockData from '../data';

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
const capitalizeFirst = (data) => {
  return data.toLowerCase().replace(data[0],data[0].toUpperCase())
}
const Pokedex = () => {
  const classes = useStyles();
  const [pokedexData,setPokedexData] = useState(mockData);

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
  return (
    <>
    <AppBar position = 'static'>
      <Toolbar></Toolbar>
    </AppBar>
    {
      pokedexData ? (
        <Grid container spacing = {2} className = {classes.pokedexStyle}>
          {
            Object.keys(mockData).map((k,idx)=>{
              const {id,name} = pokedexData[k];
              console.log(id,name)
              const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
              return <Grid item xs = {12} sm = {4} key = {id}>
                <Card>
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