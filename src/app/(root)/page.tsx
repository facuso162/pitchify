import Hero from '../components/Hero'
import Startups from '../components/Startups'

type SearchParams = Promise<{ [key: string]: string | undefined }>

type HomePageProps = {
  searchParams: SearchParams
}

async function Home({ searchParams }: HomePageProps) {
  const { query } = await searchParams

  // Mock posts
  const posts: Post[] = [
    {
      _createdAt: 'Today',
      views: 120,
      author: { _id: 2 },
      _id: 1,
      description: 'Una startup que revoluciona el mercado de la educación en línea.',
      image: '/default-image.png',
      category: 'Startups',
      title: 'EduTech Pro',
    },
    {
      _createdAt: 'Yesterday',
      views: 89,
      author: { _id: 3 },
      _id: 2,
      description: 'Innovadora empresa de logística que optimiza cadenas de suministro.',
      image: '/default-image.png',
      category: 'Empresas',
      title: 'SupplyEase Logistics',
    },
    {
      _createdAt: 'Last Week',
      views: 152,
      author: { _id: 4 },
      _id: 3,
      description: 'Plataforma para conectar inversores con pequeñas empresas emergentes.',
      image: '/default-image.png',
      category: 'Emprendimientos',
      title: 'Inversiones Conecta',
    },
  ]

  // Puede no haber searchParams, entonces en ese caso query = undefined
  return (
    <>
      <Hero query={query || ''} />
      <Startups query={query || ''} posts={posts} />
    </>
  )
}

export default Home
