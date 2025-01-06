import Hero from '@/src/components/Hero'
import Startups from '@/src/components/Startups'
import { SearchParams } from '@/src/types/general'
import { getStartupsAction } from '@/src/actions/startupsActions'

type HomePageProps = {
  searchParams: SearchParams
}

async function Home({ searchParams }: HomePageProps) {
  const { query } = await searchParams
  const startupsParams = { q: query || null }
  const startups = await getStartupsAction(startupsParams)

  // Puede no haber searchParams, entonces en ese caso query = undefined
  return (
    <main className='flex flex-col items-center'>
      <Hero query={query} />
      <Startups query={query} startups={startups} />
    </main>
  )
}

export default Home
