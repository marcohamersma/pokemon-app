import { Client, cacheExchange, fetchExchange } from '@urql/core'

export const pokeAPIGraphQLClient = new Client({
  url: 'https://beta.pokeapi.co/graphql/v1beta',
  exchanges: [cacheExchange, fetchExchange],
})
