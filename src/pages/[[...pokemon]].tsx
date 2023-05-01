import React from 'react'
import { Inter } from 'next/font/google'
import { fetchPokemon as fetchPokemonList } from '@/helpers/fetchPokemon'
import { DetailedPokemon, PokemonListItem } from '@/types'
import { Loader } from '@/components/Loader'
import { PokemonGridItem } from '@/components/PokemonGridItem'
import { GetServerSideProps } from 'next'
import { fetchPokemonDetails } from '@/helpers/fetchPokemonDetails'
import { Button } from '@/components/Button'
import { DetailedPokemonView } from '@/components/DetailedPokemon'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  pokemon: PokemonListItem[]
  previous: string | null
  next: string | null
  detailedPokemon: DetailedPokemon | null
}

export default function Home(props: Props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {props.previous && (
        <Button className="mx-auto" href={props.previous}>
          Previous Pokémon
        </Button>
      )}

      <React.Suspense fallback={<Loader />}>
        <ul className="grid grid-cols-4 gap-4 my-10">
          {props.pokemon.slice(0, 16).map((pokemon) => (
            <PokemonGridItem key={pokemon.id} {...pokemon} />
          ))}
        </ul>
      </React.Suspense>

      {props.next && (
        <Button className="mx-auto" href={props.next}>
          Next Pokémon
        </Button>
      )}

      {props.detailedPokemon && (
        <DetailedPokemonView pokemon={props.detailedPokemon} />
      )}
    </main>
  )
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (props) => {
  const params = props.params?.pokemon
  const limitPerPage = 16
  let detailed: DetailedPokemon | Error | null = null
  let startIndex = 0

  // If we're displaying a list, we know how to index
  if (!params) {
    startIndex = 0
  } else if (params[0] === 'list') {
    const parsedIndex = parseInt(params[1].split('-')[0])
    console.log('setting starting index to ' + parsedIndex)
    startIndex = isNaN(parsedIndex) ? 0 : parsedIndex
  } else if (params[0] === 'detail') {
    const pokemonSlug = params[1]
    // We need to wait here, because we want to know the number of the pokemon
    // so we know what grid to figure out what starting index to use
    detailed = await fetchPokemonDetails(pokemonSlug)
    // When we load the page, we want to load the pokemon surrounding the
    // selected pokemon
    startIndex = Math.round(detailed.id / limitPerPage) * limitPerPage
    // Load a pokemon in the detailed var
    // then based on the ID, set the startIndex
  } else {
    // Throw an error of some sort?
  }

  const pokemon = await fetchPokemonList(startIndex, limitPerPage)

  const previousIndex = startIndex - limitPerPage
  const nextIndex = startIndex + limitPerPage
  // console.log(props)
  // Pass data to the page via props
  return {
    props: {
      detailedPokemon: detailed,
      pokemon,
      previous:
        previousIndex < 0
          ? null
          : `${previousIndex}-${previousIndex + limitPerPage}`,

      // TODO: check the limit
      next:
        nextIndex > 1281 ? null : `${nextIndex}-${nextIndex + limitPerPage}`,
    },
  }
}
