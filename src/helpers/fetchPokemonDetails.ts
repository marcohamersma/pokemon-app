import { gql } from '@urql/core'
import { pokeAPIGraphQLClient } from './pokeAPIGraphQLClient'
import { DetailedPokemon } from '@/types'

const QUERY = gql`
  query ($name: String) {
    pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      name
      id
      weight
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 9 } }) {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          pokemon_v2_typenames(where: { language_id: { _eq: 9 } }) {
            name
          }
        }
      }

      pokemon_v2_pokemonmoves(distinct_on: move_id) {
        pokemon_v2_move {
          pokemon_v2_movenames(where: { language_id: { _eq: 9 } }) {
            name
          }
        }
      }
      pokemon_v2_pokemonstats(where: {}) {
        pokemon_v2_stat {
          id
          pokemon_v2_statnames(limit: 1, where: { language_id: { _eq: 9 } }) {
            name
          }
        }
        base_stat
      }
    }
  }
`

export const fetchPokemonDetails = async (
  name: string
): Promise<DetailedPokemon> => {
  // FIXME: error-resistant
  const result = await pokeAPIGraphQLClient.query(QUERY, { name })

  // TODO: With more configuration, we can generate automatic types for the
  // GraphQL schema, for now, this will do…
  const data: Record<string, any>[] = result.data.pokemon_v2_pokemon[0]

  const output: DetailedPokemon = {
    id: data.id,
    species:
      data.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesnames[0].name,
    stats: data.pokemon_v2_pokemonstats.map((i) => ({
      name: i.pokemon_v2_stat.pokemon_v2_statnames[0].name,
      baseStat: i.base_stat,
    })),
    types: data.pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.pokemon_v2_typenames[0].name
    ),
    weight: data.weight,
    moves: data.pokemon_v2_pokemonmoves.map(
      (i) => i.pokemon_v2_move.pokemon_v2_movenames[0].name
    ),
  }
  return output
}
