import { PokemonListItem } from '@/types'
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

// {
//   "pokemon_species_id": 1,
//   "name": "bulbasaur",
//   "pokemon_v2_pokemontypes": [
//     {
//       "pokemon_v2_type": {
//         "name": "grass",
//         "__typename": "pokemon_v2_type"
//       },
//       "__typename": "pokemon_v2_pokemontype"
//     },
//     {
//       "pokemon_v2_type": {
//         "name": "poison",
//         "__typename": "pokemon_v2_type"
//       },
//       "__typename": "pokemon_v2_pokemontype"
//     }
//   ],
//   "__typename": "pokemon_v2_pokemon"
// }

export const fetchPokemon = async () => {
  // This could be more error-resistant
  const result = await client.query(QUERY, {})
  const data: Record<string, any>[] = result.data.pokemon_v2_pokemon

  return data.map<PokemonListItem>((pokemon) => ({
    name: pokemon.name,
    id: pokemon.pokemon_species_id,
    types: pokemon.pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.name
    ),
    // TODO: lots of opportunity for optimisation here of course. First of all,
    // I'd never dream to hotlink to someone else's server, but I'm not
    // currently sure how to tie it in to Nextjs's image optimisation.
    // We might also be able to set up an image-resizing proxy
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokemon_species_id}.png`,
    // sprite:
  }))
}
