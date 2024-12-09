import Image from 'next/image'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { STARTUPS_QUERYResult } from '@/src/sanity/types'

type StartupCardProps = {
  startup: STARTUPS_QUERYResult[number]
}

function StartupCard({ startup }: StartupCardProps) {
  const { _createdAt, author, category, description, image, slug, title, views } = startup

  return (
    <article className='bg-white w-full border-4 border-black rounded-3xl text-black py-6 px-5 shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100 max-w-72 flex flex-col gap-2'>
      <header className='flex justify-between'>
        <div className='bg-primary-100 px-4 py-2 rounded-full'>
          <span className='font-medium'>{_createdAt}</span>
        </div>
        <div className='flex items-center gap-1'>
          <Eye size={20} className='text-primary' />
          <span className='font-medium'>{views}</span>
        </div>
      </header>
      <div className='flex justify-between items-center'>
        <div>
          <Link href={`/user/${author?.id}`}>
            <h4 className='text-sm font-medium line-clamp-1'>{`${author?.name}`}</h4>
          </Link>
          <Link href={`/startup/${slug}`}>
            <h3 className='text-xl font-semibold line-clamp-1'>{title}</h3>
          </Link>
        </div>
        <div className='w-10 h-10 relative'>
          <Link href={`/user/${author?.id}`}>
            <Image src={author?.image || './default-profile-photo.png'} fill alt='profile pic' />
          </Link>
        </div>
      </div>
      <p className='line-clamp-2 text-black-100 font-normal'>{description}</p>
      <div className='w-full h-40 relative'>
        <Link href={`/startup/${slug}`}>
          <Image
            src={image || './default-image.png'}
            alt='startup image'
            fill
            className='rounded-xl'
          />
        </Link>
      </div>
      <footer className='flex justify-between items-center'>
        <Link href={`/?query=${category?.toLocaleLowerCase()}`}>
          <span className='font-medium text-base'>{category}</span>
        </Link>
        <Link
          href={`/?query=${category?.toLocaleLowerCase()}`}
          className='bg-black-200 rounded-full px-4 py-2 text-base font-medium text-white'>
          Details
        </Link>
      </footer>
    </article>
  )
}

export default StartupCard
