import Image from 'next/image'
import pitchifyLogo from '@/public/pitchify-logo.svg'
import defaultProfilePhoto from '@/public/default-profile-photo.png'
import Link from 'next/link'
import { auth } from '@/auth'
import { singInAction, singOutAction } from '@/src/app/actions/authActions'

async function Navbar() {
  const session = await auth()

  return (
    <header className='h-16 bg-slate-100 px-4 flex items-center'>
      <nav className='flex justify-between items-center w-full'>
        <Link href='/'>
          <Image src={pitchifyLogo} alt='Logo de pitchify' />
        </Link>
        {session ? (
          <div className='flex items-center gap-4'>
            <Link href={'/startup/create'} className='text-black'>
              Create
            </Link>
            <button className='text-[#EF4444]' onClick={singOutAction}>
              Logout
            </button>
            <Link href={`/user/${session.user?.id}`}>
              <div className='w-9 h-9 rounded-full relative'>
                <Image
                  src={session.user?.image || defaultProfilePhoto}
                  style={{ borderRadius: '50%' }}
                  fill
                  alt='Foto de perfil'
                />
              </div>
            </Link>
          </div>
        ) : (
          <button className='text-black' onClick={singInAction}>
            Login
          </button>
        )}
      </nav>
    </header>
  )
}

export default Navbar
