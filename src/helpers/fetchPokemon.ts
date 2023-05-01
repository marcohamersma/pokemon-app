import { PokemonListItem } from '@/types'
import { Client, cacheExchange, fetchExchange, gql } from '@urql/core'

const client = new Client({
  url: 'https://beta.pokeapi.co/graphql/v1beta',
  exchanges: [cacheExchange, fetchExchange],
})

const QUERY = gql`
  query ($limit: Int = 16, $offset: Int = 0) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      order_by: { pokemon_species_id: asc }
    ) {
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

export const fetchPokemon = async (offset: number, limit?: number) => {
  // FIXME: error-resistant
  const result = await client.query(QUERY, { offset, limit })
  // TODO: With more configuration, we can generate automatic types for the
  // GraphQL schema, for now, this will do…
  const data: Record<string, any>[] = result.data.pokemon_v2_pokemon

  return data.map<PokemonListItem>((pokemon) => ({
    name: pokemon.name,
    id: pokemon.pokemon_species_id,
    types: pokemon.pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.name
    ),
    // sprite:
  }))
}
