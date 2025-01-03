'use client'

import Link from 'next/link'
import Image from 'next/image'
import pitchifyLogo from '@/public/pitchify-logo.svg'

function Error() {
  return (
    <main className={`text-black flex flex-col h-dvh justify-center items-center px-4`}>
      <div className='flex flex-col gap-4 items-start'>
        <Link href='/'>
          <div className='h-20 w-36 relative '>
            <Image src={pitchifyLogo} className='-top-1' alt='Logo de pitchify' fill />
          </div>
        </Link>
        <h1 className='text-6xl font-bold'>Ups!</h1>

        <p className='text-xl font-medium'>An unexpected error ocurred</p>

        <Link
          href='/'
          className='bg-black-200 rounded-full px-4 py-2 text-base font-medium text-white'>
          Return Home
        </Link>
      </div>
    </main>
  )
}

export default Error
