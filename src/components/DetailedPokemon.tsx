import React from 'react'

import { DetailedPokemon } from '@/types'

export const DetailedPokemonView: React.FC<{ pokemon: DetailedPokemon }> = ({
  pokemon,
}) => {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

  return (
    <div className="flex flex-row lg:flex-col gap-10">
      <div className="w-40 h-auto">
        <img src={image} width="1000" height="1000" />
      </div>
      <div className="shrink-0">
        <h1 className="font-extrabold text-3xl">{pokemon.species}</h1>
        <p>Description here</p>
        <h2>Weight</h2>
        {pokemon.weight} pixels
        <h2>Types</h2>
        {pokemon.types.map((i) => (
          <div
            key={i}
            className="p-1 rounded-sm mr-2 inline-block bg-slate-200"
          >
            {i}
          </div>
        ))}
        <h2>Moves</h2>
        {pokemon.moves.map((i) => (
          <div
            key={i}
            className="p-1 rounded-sm mr-2 inline-block bg-orange-100"
          >
            {i}
          </div>
        ))}
        <h2>Stats</h2>
        <table>
          <tbody>
            {pokemon.stats.map((i) => (
              <tr key={i.name}>
                <td>{i.name}</td>
                <td>{i.baseStat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
