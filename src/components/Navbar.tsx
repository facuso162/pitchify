import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/src/auth'
import { singInAction, singOutAction } from '@/src/actions/authActions'
import { Plus, LayoutGrid, LogOut } from 'lucide-react'
import { getAuthorAction } from '../actions/authorActions'
import { AUTHOR_BY_ID_QUERYResult } from '../sanity/types'

async function Navbar() {
  const session = await auth()

  let author: AUTHOR_BY_ID_QUERYResult | null = null
  if (session && session.authorID) {
    author = await getAuthorAction(session.authorID)
  }

  return (
    <header className='h-16 bg-slate-100 px-4 flex items-center md:px-16'>
      <nav className='flex justify-between items-center w-full'>
        <Link href='/'>
          <div className='h-9 w-20 relative md:h-12 md:w-24'>
            <Image src='/pitchify-logo.svg' className='-top-1' alt='Logo de pitchify' fill />
          </div>
        </Link>
        {author ? (
          <div className='flex items-center gap-4'>
            <Link href={'/startup/create'}>
              <span className='text-black font-medium hidden xs:inline md:text-lg'>Create</span>
              <Plus size={20} className='text-black xs:hidden' />
            </Link>
            <Link href={`/author/${author.authorID}`}>
              <span className='text-black font-medium hidden xs:inline md:text-lg'>
                Your startups
              </span>
              <LayoutGrid size={20} className='text-black xs:hidden' />
            </Link>
            <button onClick={singOutAction}>
              <span className='text-primary font-medium hidden xs:inline md:text-lg'>Logout</span>
              <LogOut size={20} className='text-primary xs:hidden' />
            </button>
            <Link href={`/author/${author.authorID}/config`}>
              <div className='w-9 h-9 rounded-full relative'>
                <Image
                  src={author.imageUrl || '/default-author-image.webp'}
                  style={{ borderRadius: '50%' }}
                  fill
                  alt='Foto de perfil'
                  className='object-cover'
                />
              </div>
            </Link>
          </div>
        ) : (
          <button className='text-black font-medium md:text-lg' onClick={singInAction}>
            Login
          </button>
        )}
      </nav>
    </header>
  )
}

export default Navbar
