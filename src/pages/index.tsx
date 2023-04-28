import React from 'react'
import Image from 'next/image'
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
export const getServerSideProps: GetServerSideProps = async () => {
  const pokemon = await fetchPokemon()

  // Pass data to the page via props
  return { props: { pokemon } }
}
