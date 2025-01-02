import { STARTUPS_QUERYResult } from '@/src/sanity/types'
import StartupCard from './StartupCard'
import { Frown } from 'lucide-react'

type StartupsProps = {
  query: string
  startups: STARTUPS_QUERYResult
}

function Startups({ query, startups }: StartupsProps) {
  return (
    <section className='py-6'>
      <h2 className='text-black font-semibold text-lg px-4 md:px-16'>
        {query !== '' ? `Search results for "${query}"` : `All Startups`}
      </h2>

      {startups.length > 0 ? (
        <ul className='card-grid justify-center py-6 px-4'>
          {startups.map(startup => (
            <StartupCard startup={startup} key={startup.slug} />
          ))}
        </ul>
      ) : (
        <div className='flex flex-col gap-4 justify-center items-center py-10'>
          <Frown className='text-black-100' size={40} strokeWidth={1} />
          <p className='text-black-100 font-normal text-lg'>No startups found</p>
        </div>
      )}
    </section>
  )
}

export default Startups
