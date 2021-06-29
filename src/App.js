import { makeStyles } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router';
import Pokedex from './components/pokedex';
import Pokemon from './components/pokemon';

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

function App() {
  const classes = useStyles();
  return (
    <div>
    <Switch>
      <Route 
        exact
        path = '/' 
        render = {(props)=> <Pokedex {...props}/>}
      />
      <Route
        exact
        path = '/:pokemonid'
        render = {(props)=><Pokemon {...props}/>}
      />
    </Switch>
    </div>
  );
}

export default App;
