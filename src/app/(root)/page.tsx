import Hero from '../components/Hero'
import Startups from '../components/Startups'
import { SearchParams } from '../types/general'
import { getStartupsAction } from '../actions/startupsActions'

type HomePageProps = {
  searchParams: SearchParams
}

async function Home({ searchParams }: HomePageProps) {
  const { query } = await searchParams
  const startupsParams = { q: query || null }
  const startups = await getStartupsAction(startupsParams)

  // Puede no haber searchParams, entonces en ese caso query = undefined
  return (
    <>
      <Hero query={query || ''} />
      <Startups query={query || ''} startups={startups} />
    </>
  )
}

export default Home
