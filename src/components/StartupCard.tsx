import Image from 'next/image'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { STARTUPS_QUERYResult } from '@/src/sanity/types'
import { formatDate } from '@/src/utils/format'
import { formatStartupImageAltText, formatAuthorImageAltText } from '@/src/utils/format'
import { getCategoryTitle } from '../utils/category'

type StartupCardProps = {
  startup: STARTUPS_QUERYResult[number]
}

function StartupCard({ startup }: StartupCardProps) {
  const {
    _createdAt,
    author,
    category,
    description,
    slug,
    title,
    views,
    imageUrl: startupImageURL,
  } = startup

  // Si alguna propiedad es null, no se renderiza nada, osea, no se
  // mostrara la tarjeta en la lista, que es el comportamiento deseado
  // ante este tipo de error.
  if (
    title === null ||
    description === null ||
    author === null ||
    category === null ||
    views === null
  )
    return

  const { name, imageUrl: authorImageURL, authorID } = author

  if (name === null || authorID === null) return

  return (
    <li>
      <article className='group bg-white border-4 border-black rounded-3xl text-black py-6 px-5 shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100 w-72 flex flex-col gap-2'>
        <header className='flex justify-between'>
          <div className='bg-primary-100 px-4 py-2 rounded-full transition-all duration-500 group-hover:bg-white'>
            <span className='font-medium'>{formatDate(_createdAt)}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Eye size={20} className='text-primary' />
            <span className='font-medium'>{views}</span>
          </div>
        </header>
        <div className='flex justify-between items-center'>
          <div>
            <Link href={`/author/${authorID}`}>
              <h4 className='text-sm font-medium line-clamp-1'>{name}</h4>
            </Link>
            <Link href={`/startup/${slug}`}>
              <h3 className='text-xl font-semibold line-clamp-1'>{title}</h3>
            </Link>
          </div>
          <div className='w-10 h-10 relative'>
            <Link href={`/author/${authorID}`}>
              <Image
                src={authorImageURL || '/default-author-image.webp'}
                fill
                alt={formatAuthorImageAltText(name)}
                className='rounded-full'
              />
            </Link>
          </div>
        </div>
        <p className='line-clamp-2 text-black-100 font-normal h-12'>{description}</p>
        <div className='w-full h-40 relative'>
          <Link href={`/startup/${slug}`}>
            <Image
              src={startupImageURL || '/default-startup-image.webp'}
              alt={formatStartupImageAltText(title)}
              fill
              className='rounded-xl'
            />
          </Link>
        </div>
        <footer className='flex justify-between items-center'>
          <Link href={`/?query=${category}`}>
            <span className='font-medium text-base'>{getCategoryTitle(category)}</span>
          </Link>
          <Link
            href={`/startup/${slug}`}
            className='bg-black-200 rounded-full px-4 py-2 text-base font-medium text-white'>
            Details
          </Link>
        </footer>
      </article>
    </li>
  )
}

export default StartupCard
