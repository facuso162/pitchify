import { getAuthorAction } from '@/src/actions/authorActions'
import { getStartupsByAuthorID } from '@/src/actions/startupsActions'
import Image from 'next/image'
import StartupCard from '@/src/components/StartupCard'

type Params = { params: Promise<{ id: string }> }

async function AuthorDetails({ params }: Params) {
  const { id } = await params

  const author = await getAuthorAction(id)

  if (author === null) {
    throw new Error('Getting null data for the author')
  }

  const { name, username, imageUrl: authorImageURL, bio } = author

  if (name === null || username === null) {
    throw new Error('Getting null data for the author')
  }

  const startups = await getStartupsByAuthorID(id)

  return (
    <main className='flex justify-center'>
      <div className='p-4 mt-4 gap-8 flex flex-col max-w-screen-large-grid w-full'>
        <section className='border-4  shadow-200 border-black relative bg-primary flex justify-between rounded-3xl p-2 w-72'>
          <div className='absolute border-2 border-black bg-white right-4 -top-4 px-5 py-1 rounded-xl uppercase font-extrabold'>
            <h1 className='text-black'>{name}</h1>
          </div>
          <div className='border-2 border-black rounded-full'>
            <div className='w-20 h-20 rounded-full relative border-2 border-white'>
              <Image
                src={authorImageURL || '/default-author-photo.png'}
                style={{ borderRadius: '50%' }}
                fill
                alt='Foto de perfil'
              />
            </div>
          </div>
          <div className='w-2/3 flex flex-col justify-end'>
            <h2 className='font-extrabold'>@{username}</h2>
            <p className='h-12'>{bio || 'No bio'}</p>
          </div>
        </section>
        <section className='flex flex-col gap-8'>
          <h2 className='text-black font-semibold text-lg'>{name}&apos;s startups</h2>

          {startups.length > 0 ? (
            <ul className='card-grid justify-center'>
              {startups.map(startup => (
                <StartupCard startup={startup} key={startup.slug} />
              ))}
            </ul>
          ) : (
            <p className='text-black-100 font-medium text-center'>No startups found</p>
          )}
        </section>
      </div>
    </main>
  )
}

export default AuthorDetails
