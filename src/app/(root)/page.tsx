import Hero from '../components/Hero'

type SearchParams = Promise<{ [key: string]: string | undefined }>

type HomePageProps = {
  searchParams: SearchParams
}

async function Home({ searchParams }: HomePageProps) {
  const { query } = await searchParams

  // Puede no haber searchParams, entonces en ese caso query = undefined
  return <Hero query={query || ''} />
}

export default Home
