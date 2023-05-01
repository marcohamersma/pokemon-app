import { PokemonListItem } from '@/types'
import { gql } from '@urql/core'
import { pokeAPIGraphQLClient } from './pokeAPIGraphQLClient'

const QUERY = gql`
  query ($limit: Int = 16, $offset: Int = 0) {
    # pokemon_v2_pokemon(
    #   limit: $limit
    #   offset: $offset
    #   order_by: { pokemon_species_id: asc }
    #   distinct_on: pokemon_species_id
    # ) {
    #   pokemon_species_id
    #   name
    #   pokemon_v2_pokemontypes {
    #     pokemon_v2_type {
    #       name
    #     }
    #   }
    # }
    pokemon_v2_pokemonspecies(
      limit: $limit
      offset: $offset
      order_by: { id: asc }
      distinct_on: id
    ) {
      id
      name
      pokemon_v2_pokemonspeciesnames(
        limit: 1
        where: { language_id: { _eq: 9 } }
      ) {
        name
      }
      pokemon_v2_pokemons(limit: 1) {
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            pokemon_v2_typenames(where: { language_id: { _eq: 9 } }) {
              name
            }
          }
        }
      }
    }
  }
`

export const fetchPokemon = async (offset: number, limit?: number) => {
  // FIXME: error-resistant
  const result = await pokeAPIGraphQLClient.query(QUERY, { offset, limit })
  // TODO: With more configuration, we can generate automatic types for the
  // GraphQL schema, for now, this will do…
  const data: Record<string, any>[] = result.data.pokemon_v2_pokemonspecies

  return data.map<PokemonListItem>((pokemon) => ({
    name: pokemon.pokemon_v2_pokemonspeciesnames[0].name,
    id: pokemon.id,
    slug: pokemon.name,
    // For further optimisation, I'd just return an idea of types and return an
    // overview of localised type names as well
    types: pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
      (type) => type.pokemon_v2_type.pokemon_v2_typenames[0].name
    ),
    // sprite (for search)
  }))
}
