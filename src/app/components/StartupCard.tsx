import Image from 'next/image'
import { Eye } from 'lucide-react'
import { Post } from '../types/post'
import Link from 'next/link'

type StartupCardProps = {
  post: Post
}

function StartupCard({ post }: StartupCardProps) {
  //todo: se puede hacer destructuring de las props del post

  return (
    <article className='bg-white w-full border-4 border-black rounded-3xl text-black py-6 px-5 shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100 max-w-72 flex flex-col gap-2'>
      <header className='flex justify-between'>
        <div className='bg-primary-100 px-4 py-2 rounded-full'>
          <span className='font-medium'>{post._createdAt}</span>
        </div>
        <div className='flex items-center gap-1'>
          <Eye size={20} className='text-primary' />
          <span className='font-medium'>{post.views}</span>
        </div>
      </header>
      <div className='flex justify-between items-center'>
        <div>
          <Link href={`/user/${post.author._id}`}>
            <h4 className='text-sm font-medium line-clamp-1'>{`${post.author.firstName} ${post.author.lastName}`}</h4>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className='text-xl font-semibold line-clamp-1'>{post.title}</h3>
          </Link>
        </div>
        <div className='w-10 h-10 relative'>
          <Link href={`/user/${post.author._id}`}>
            <Image src={post.author.profileImage} fill alt='profile pic' />
          </Link>
        </div>
      </div>
      <p className='line-clamp-2 text-black-100 font-normal'>{post.description}</p>
      <div className='w-full h-40 relative'>
        <Link href={`/startup/${post._id}`}>
          <Image src={post.image} alt='startup image' fill className='rounded-xl' />
        </Link>
      </div>
      <footer className='flex justify-between items-center'>
        <Link href={`/?query=${post.category.toLocaleLowerCase()}`}>
          <span className='font-medium text-base'>{post.category}</span>
        </Link>
        <Link
          href={`/?query=${post.category.toLocaleLowerCase()}`}
          className='bg-black-200 rounded-full px-4 py-2 text-base font-medium text-white'>
          Details
        </Link>
      </footer>
    </article>
  )
}

export default StartupCard
