import React from 'react'
import { Inter } from 'next/font/google'
import { fetchPokemon } from '@/helpers/fetchPokemon'
import { PokemonListItem } from '@/types'
import { Loader } from '@/components/Loader'
import { PokemonGridItem } from '@/components/PokemonGridItem'
import { GetServerSideProps } from 'next'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  pokemon: PokemonListItem[]
}

export default function Home(props: Props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <React.Suspense fallback={<Loader />}>
        <ul className="grid grid-cols-5 gap-4">
          {props.pokemon.slice(0, 16).map((pokemon) => (
            <PokemonGridItem key={pokemon.id} {...pokemon} />
          ))}
        </ul>
      </React.Suspense>
    </main>
  )
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (props) => {
  const params = props.params?.pokemon
  let detailed: DetailedPokemon | undefined
  let startIndex = 0

  // If we're displaying a list, we know how to index
  if (!params) {
    startIndex = 0
  } else if (params[0] === 'list') {
    const parsedIndex = parseInt(params[1].split('-')[0])
    console.log('setting starting index to ' + parsedIndex)
    startIndex = isNaN(parsedIndex) ? 0 : parsedIndex
  } else if (params[0] === 'detail') {
    // Load a pokemon in the detailed var
    // then based on the ID, set the startIndex
  }

  console.log(startIndex)
  // if
  const pokemon = await fetchPokemon(startIndex, 16)
  // console.log(props)

  // Pass data to the page via props
  return { props: { pokemon } }
}
