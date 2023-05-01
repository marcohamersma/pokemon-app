export interface PokemonListItem {
  name: string
  slug: string
  // sprite: string
  id: number
  types: string[]
  // blurhash: string
}

interface PokemonStat {
  name: string
  baseStat: number
}

export interface DetailedPokemon {
  id: number
  species: string
  stats: PokemonStat[]
  types: string[]
  weight: number
  moves: string[]
}
