import { getStartupDetailsAction, increaseStartupViewsAction } from '@/src/actions/startupsActions'
import { formatDate } from '@/src/utils/format'
import Image from 'next/image'
import markdownit from 'markdown-it'
import { notFound } from 'next/navigation'
import { unstable_after as after } from 'next/server'
import { formatStartupImageAltText, formatAuthorImageAltText } from '@/src/utils/format'
import Link from 'next/link'

const md = markdownit()

type Params = Promise<{ slug: string }>

async function StartupDetails({ params }: { params: Params }) {
  const { slug } = await params
  const startup = await getStartupDetailsAction(slug)

  if (startup === null) notFound()

  const {
    startupID,
    _createdAt,
    title,
    description,
    pitch,
    author,
    category,
    imageUrl: startupImageURL,
  } = startup

  if (
    title === null ||
    description === null ||
    author === null ||
    category === null ||
    pitch === null
  ) {
    throw new Error('Getting null data for the startup')
  }

  const { name, username, imageUrl: authorImageURL, authorID } = author

  if (name === null || username === null) {
    throw new Error('Getting null data for the author')
  }

  const parsedPitch = md.render(pitch)

  after(async () => await increaseStartupViewsAction(startupID))

  return (
    <main className='flex flex-col items-center'>
      <section className='pink-container'>
        <h5 className='tag'>{formatDate(_createdAt)}</h5>
        <h1 className='heading'>{title}</h1>
        <p className='sub-heading'>{description}</p>
      </section>
      <section className='flex flex-col items-center text-black p-4 gap-4 max-w-screen-large-grid w-full'>
        <div className='min-w-72 min-h-40 max-w-5xl w-full aspect-[16/9] relative md:my-4'>
          <Image
            src={startupImageURL || '/default-startup-image.webp'}
            alt={formatStartupImageAltText(title)}
            fill
            className='rounded-xl'
          />
        </div>
        <div className='flex flex-col gap-2 w-full max-w-5xl'>
          <div className='flex gap-2'>
            <Link href={`/author/${authorID}`}>
              <div className='w-12 h-12 relative'>
                <Image
                  src={authorImageURL || '/default-author-image.webp'}
                  alt={formatAuthorImageAltText(name)}
                  fill
                  className='rounded-full'
                />
              </div>
            </Link>
            <div>
              <Link href={`/author/${authorID}`}>
                <h3 className='font-bold'>{name}</h3>
              </Link>
              <span className='font-medium'>@{username}</span>
            </div>
          </div>
          <p className='bg-primary-100 px-2 py-1 font-medium rounded-full w-fit'>{category}</p>
        </div>
        <article className='prose' dangerouslySetInnerHTML={{ __html: parsedPitch }} />
      </section>
    </main>
  )
}

export default StartupDetails
