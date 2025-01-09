import { auth, providersMap, signIn } from '@/src/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

async function SignIn() {
  const session = await auth()

  if (session !== null) {
    redirect('/')
  }

  return (
    <main className='w-full h-dvh flex flex-col justify-between items-center'>
      <Link href='/'>
        <div className='h-16 w-24 relative'>
          <Image src={'/pitchify-logo.svg'} className='-top-1' alt='Logo de pitchify' fill />
        </div>
      </Link>
      <div className='grow flex items-center'>
        <div className='border-2 border-black rounded-3xl flex flex-col items-center p-4 w-fit gap-4'>
          {providersMap.map(provider => {
            return (
              <form
                key={provider.id}
                action={async () => {
                  'use server'

                  await signIn(provider.id, { redirectTo: '/' })
                }}>
                <button
                  className='flex border-2 border-black rounded-3xl px-6 py-2 justify-center items-center gap-2 uppercase font-bold text-white bg-primary'
                  type='submit'>
                  Login with {provider.name}
                </button>
              </form>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default SignIn
