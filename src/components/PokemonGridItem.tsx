import React from 'react'
import { PokemonListItem } from '@/types'
import Link from 'next/link'

interface Props extends PokemonListItem {}

export const PokemonGridItem: React.FC<Props> = (props) => {
  // TODO: lots of opportunity for optimisation here of course. First of all,
  // I'd never dream to hotlink to someone else's server, but I'm not
  // currently sure how to tell nextjs to optimise images that will only have
  // a dynamic reference to them (i.e. <Image src={pokemon.image} />).
  // Alternatively we could download and pre-process the images ourselves or
  // serve them from a service that supports in-url transformations.
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`

  return (
    <li>
      <Link
        href={`/${encodeURIComponent(props.name)}`}
        className="bg-slate-400 rounded-md focus:ring block shadow-xl"
      >
        <div className="bg-white p-4">
          <img src={image} alt="" />
        </div>
        <div className="p-2 text-center font-bold tracking-wide">
          {props.name}
        </div>
      </Link>
    </li>
  )
}
