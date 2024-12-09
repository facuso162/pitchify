import Hero from '../components/Hero'
import Startups from '../components/Startups'
import { client } from '@/src/sanity/lib/client'
import { STARTUPS_QUERY } from '@/src/sanity/lib/queries'

type SearchParams = Promise<{ [key: string]: string | undefined }>

type HomePageProps = {
  searchParams: SearchParams
}

async function Home({ searchParams }: HomePageProps) {
  const { query } = await searchParams
  const startups = await client.fetch(STARTUPS_QUERY)

  // Puede no haber searchParams, entonces en ese caso query = undefined
  return (
    <>
      <Hero query={query || ''} />
      <Startups query={query || ''} startups={startups} />
    </>
  )
}

export default Home
