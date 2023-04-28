import React from 'react'
import { PokemonListItem } from '@/types'
import Link from 'next/link'

interface Props extends PokemonListItem {}

export const PokemonGridItem: React.FC<Props> = (props) => {
  return (
    <li>
      <Link
        href={`/${encodeURIComponent(props.name)}`}
        className="bg-slate-400 rounded-md focus:ring block shadow-xl"
      >
        <div className="bg-white p-4">
          <img src={props.image} alt="" />
        </div>
        <div className="p-2 text-center font-bold tracking-wide">
          {props.name}
        </div>
      </Link>
    </li>
  )
}
