import Link from 'next/link'
import Image from 'next/image'
import pitchifyLogo from '@/public/pitchify-logo.svg'
import { workSans } from './fonts/fonts'

function NotFound() {
  return (
    <main
      className={`text-black flex flex-col h-dvh justify-center items-center px-4 ${workSans.variable}`}>
      <div className='flex flex-col gap-4 items-start'>
        <Link href='/'>
          <div className='h-20 w-36 relative '>
            <Image src={pitchifyLogo} className='-top-1' alt='Logo de pitchify' fill />
          </div>
        </Link>
        <h1 className='text-6xl font-bold'>Page not found</h1>

        <p className='text-xl font-medium'>The page you were looking for doesn&apos;t exist</p>

        <Link
          href='/'
          className='bg-black-200 rounded-full px-4 py-2 text-base font-medium text-white'>
          Return Home
        </Link>
      </div>
    </main>
  )
}

export default NotFound
