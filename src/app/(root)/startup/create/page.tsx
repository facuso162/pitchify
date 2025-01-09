import { auth } from '@/src/auth'
import { redirect } from 'next/navigation'
import CreateStartupForm from '@/src/components/CreateStartupForm'

async function CreateStartup() {
  const session = await auth()

  if (session === null) redirect('/auth/signin')

  if (session.authorID === undefined) throw new Error('Getting undefined authorID from the session')

  return (
    <main>
      <section className='pink-container'>
        <h1 className='heading'>Submit your startup pitch</h1>
      </section>
      <section className='text-black p-2 flex justify-center md:py-10'>
        <CreateStartupForm authorID={session.authorID} />
      </section>
    </main>
  )
}

export default CreateStartup
