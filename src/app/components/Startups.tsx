import StartupCard from "./StartupCard"

type Post = {
  _createdAt: string
  views: number
  author: {
    _id: number
  }
  _id: number
  description: string
  image: string
  category: string
  title: string
}

type StartupsProps = {
  query: string
  posts: Post[]
}

function Startups({ query, posts }: StartupsProps) {
  return (
    <section className='py-6'>
      <h2 className='text-black font-semibold text-lg px-4 md:px-16'>
        {query !== '' ? `Search results for "${query}"` : `All Startups`}
      </h2>
      <ul className='card-grid justify-center py-6 px-4'>
        {posts.length > 0 ? (
          posts.map(post => (
            <li key={post._id} className='flex justify-center w-fit'>
              <StartupCard />
            </li>
          ))
        ) : (
          <p className='text-black-100 text-sm font-normal'>No startups found</p>
        )}
      </ul>
    </section>
  )
}

export default Startups
