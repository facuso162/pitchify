import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import CreateStartupForm from '@/src/app/components/CreateStartupForm'

async function CreateStartup() {
  const session = await auth()

  // TODO - Tambien se lo podria reenviar a la pantalla de logeo
  if (session === null) redirect('/')

  return (
    <main>
      <section className='pink-container'>
        <h1 className='heading'>Submit your startup pitch</h1>
      </section>
      <section className='text-black p-2 flex justify-center md:py-10'>
        <CreateStartupForm />
      </section>
    </main>
  )
}

export default CreateStartup
