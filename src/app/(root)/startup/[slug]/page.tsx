import { getStartupDetailsAction } from '@/src/app/actions/startupsActions'
import { parseDate } from '@/src/app/utils/parse'
import Image from 'next/image'
import markdownit from 'markdown-it'
import { notFound } from 'next/navigation'

const md = markdownit()

type Params = Promise<{ slug: string }>

async function StartupDetails({ params }: { params: Params }) {
  const { slug } = await params
  const startup = await getStartupDetailsAction(slug)

  if (startup === null) notFound()

  const { _createdAt, title, description, pitch, author, category, imageAlt, imageUrl } = startup

  const parsedPitch = md.render(pitch || '')

  return (
    <main>
      <section className='pink-container'>
        <h5 className='tag'>{parseDate(_createdAt)}</h5>
        <h1 className='heading'>{title}</h1>
        <p className='sub-heading'>{description}</p>
      </section>
      <section className='flex flex-col items-center text-black p-4 gap-4'>
        <div className='min-w-72 min-h-40 max-w-5xl w-full aspect-[16/9] relative md:my-4'>
          <Image
            src={imageUrl || '/default-image.png'}
            alt={imageAlt || 'Startup post image'}
            fill
            className='rounded-xl'
          />
        </div>
        <div className='flex flex-col gap-2 w-full max-w-5xl'>
          <div className='flex gap-2'>
            <div className='w-12 h-12 relative'>
              <Image
                src={author?.imageUrl || '/default-profile-photo.png'}
                alt={author?.imageAlt || 'Profile photo'}
                fill
                className='rounded-full'
              />
            </div>
            <div>
              <h3 className='font-bold'>{author?.name}</h3>
              <span className='font-medium'>@{author?.username}</span>
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
