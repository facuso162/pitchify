import Hero from '../components/Hero'
import Startups from '../components/Startups'

type SearchParams = Promise<{ [key: string]: string | undefined }>

type HomePageProps = {
  searchParams: SearchParams
}

async function Home({ searchParams }: HomePageProps) {
  const { query } = await searchParams

  // Mock users
  const users = [
    {
      _id: 1,
      firstName: 'Ana',
      lastName: 'Gómez',
      profileImage: '/default-profile-photo.png',
    },
    {
      _id: 2,
      firstName: 'Carlos',
      lastName: 'Martínez',
      profileImage: '/default-profile-photo.png',
    },
    {
      _id: 3,
      firstName: 'Lucía',
      lastName: 'Pérez',
      profileImage: '/default-profile-photo.png',
    },
    {
      _id: 4,
      firstName: 'David',
      lastName: 'Rodríguez',
      profileImage: '/default-profile-photo.png',
    },
  ]

  // Mock posts
  const posts = [
    {
      _createdAt: '05/11/2024', // DD/MM/AAAA
      views: 120,
      author: { _id: 2 },
      _id: 1,
      description: 'Una startup que revoluciona el mercado de la educación en línea.',
      image: "'/default-image.png'",
      category: 'Startups',
      title: 'EduTech Pro',
    },
    {
      _createdAt: '04/11/2024',
      views: 89,
      author: { _id: 3 },
      _id: 2,
      description: 'Innovadora empresa de logística que optimiza cadenas de suministro.',
      image: "'/default-image.png'",
      category: 'Empresas',
      title: 'SupplyEase Logistics',
    },
    {
      _createdAt: '28/10/2024',
      views: 152,
      author: { _id: 4 },
      _id: 3,
      description: 'Plataforma para conectar inversores con pequeñas empresas emergentes.',
      image: "'/default-image.png'",
      category: 'Emprendimientos',
      title: 'Inversiones Conecta',
    },
    {
      _createdAt: '28/10/2024',
      views: 152,
      author: { _id: 4 },
      _id: 4,
      description: 'Plataforma para conectar inversores con pequeñas empresas emergentes.',
      image: '/default-image.png',
      category: 'Emprendimientos',
      title: 'Inversiones Conecta',
    },
    {
      _createdAt: '28/10/2024',
      views: 152,
      author: { _id: 4 },
      _id: 5,
      description: 'Plataforma para conectar inversores con pequeñas empresas emergentes.',
      image: '/default-image.png',
      category: 'Emprendimientos',
      title: 'Inversiones Conecta',
    },
    {
      _createdAt: '28/10/2024',
      views: 152,
      author: { _id: 4 },
      _id: 6,
      description: 'Plataforma para conectar inversores con pequeñas empresas emergentes.',
      image: '/default-image.png',
      category: 'Emprendimientos',
      title: 'Inversiones Conecta',
    },
    {
      _createdAt: '28/10/2024',
      views: 152,
      author: { _id: 4 },
      _id: 7,
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
