import Image from 'next/image'
import { Inter } from 'next/font/google'
import { fetchPokemon } from '@/helpers/fetchPokemon'

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  console.log(props)
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      Eyyy
    </main>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const data = await fetchPokemon()

  // Pass data to the page via props
  return { props: { data } }
}
