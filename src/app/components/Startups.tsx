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
    <section className='px-2 py-6'>
      <h2 className='text-black font-semibold text-lg'>
        {query !== '' ? `Search results for "${query}"` : `All Startups`}
      </h2>
      <ul className='card-grid'>
        {posts.length > 0 ? (
          posts.map(post => (
            <li key={post._id}>
              <article className='w-full h-20 border-2 border-black rounded'></article>
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
