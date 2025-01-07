import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/src/auth'
import { singInAction, singOutAction } from '@/src/actions/authActions'
import { Plus, LayoutGrid, LogOut } from 'lucide-react'

async function Navbar() {
  const session = await auth()

  return (
    <header className='h-16 bg-slate-100 px-4 flex items-center md:px-16'>
      <nav className='flex justify-between items-center w-full'>
        <Link href='/'>
          <div className='h-9 w-20 relative md:h-12 md:w-24'>
            <Image src='/pitchify-logo.svg' className='-top-1' alt='Logo de pitchify' fill />
          </div>
        </Link>
        {session && session.authorID ? (
          <div className='flex items-center gap-4'>
            <Link href={'/startup/create'}>
              <span className='text-black font-medium hidden xs:inline md:text-lg'>Create</span>
              <Plus size={20} className='text-black xs:hidden' />
            </Link>
            <Link href={`/author/${session.authorID}`}>
              <span className='text-black font-medium hidden xs:inline md:text-lg'>
                Your startups
              </span>
              <LayoutGrid size={20} className='text-black xs:hidden' />
            </Link>
            <button onClick={singOutAction}>
              <span className='text-primary font-medium hidden xs:inline md:text-lg'>Logout</span>
              <LogOut size={20} className='text-primary xs:hidden' />
            </button>
            <Link href={`/author/${session.authorID}/config`}>
              <div className='w-9 h-9 rounded-full relative'>
                <Image
                  src={
                    session.user && session.user.image
                      ? session.user.image
                      : '/default-author-photo.png'
                  }
                  style={{ borderRadius: '50%' }}
                  fill
                  alt='Foto de perfil'
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
