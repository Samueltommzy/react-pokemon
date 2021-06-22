import React from 'react'

function Pokemon(props) {
  const { match } = props;
  const { params} = match
  return (
    <div>
      This is pokemon page for pokemon with id {params.pokemonid}
    </div>
  )
}

export default Pokemon;
