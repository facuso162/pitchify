import StartupCard from './StartupCard'
import { Post } from '../types/post'
import { Frown } from 'lucide-react'

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

      {posts.length > 0 ? (
        <ul className='card-grid justify-center py-6 px-4'>
          {posts.map(post => (
            <li key={post._id} className='flex justify-center w-fit'>
              <StartupCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex flex-col gap-4 justify-center items-center py-10'>
          <Frown className='text-black-100' size={40} strokeWidth={1}/>
          <p className='text-black-100 font-normal text-lg'>No startups found</p>
        </div>
      )}
    </section>
  )
}

export default Startups
