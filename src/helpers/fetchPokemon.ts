import { Client, cacheExchange, fetchExchange, gql } from '@urql/core'

const client = new Client({
  url: 'https://beta.pokeapi.co/graphql/v1beta',
  exchanges: [cacheExchange, fetchExchange],
})

const QUERY = gql`
  query {
    pokemon_v2_pokemon {
      pokemon_species_id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`

export const fetchPokemon = async () => {
  // This could be more error-resistant
  const result = await client.query(QUERY, {})
  return result.data
  // return result.data.pokemon_v2_pokemon.map()
}
