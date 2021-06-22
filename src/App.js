import React from 'react';
import { Route, Switch } from 'react-router';
import Pokedex from './components/pokedex';
import Pokemon from './components/pokemon';

function App() {
  return (
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
  );
}

export default App;
