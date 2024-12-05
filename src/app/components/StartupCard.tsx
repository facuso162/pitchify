import Image from 'next/image'
import { Eye } from 'lucide-react'

function StartupCard () {

    return (
        <article className='bg-white w-full border-4 border-black rounded-3xl text-black py-6 px-5 shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100 max-w-72 flex flex-col gap-2'>
        <header className='flex justify-between'>
          <div className='bg-primary-100 px-4 py-2 rounded-full'>
            <span className='font-medium'>20 May, 2023</span>
          </div>
          <div className='flex items-center gap-1'>
            <Eye size={20} className='text-primary' />
            <span className='font-medium'>232</span>
          </div>
        </header>
        <div className='flex justify-between items-center'>
          <div>
            <h4 className='text-sm font-medium'>Steven Smith</h4>
            <h3 className='text-xl font-semibold'>EcoTrack</h3>
          </div>
          <div className='w-10 h-10 relative'>
            <Image src='/default-profile-photo.png' fill alt='profile pic' />
          </div>
        </div>
        <p className='line-clamp-2 text-black-100 font-normal'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere perspiciatis
          omnis corrupti quae minus voluptatem quis blanditiis dolor velit quasi?
        </p>
        <div className='w-full h-40 relative'>
          <Image src='/default-image.png' alt='startup image' fill className='rounded-xl'/>
        </div>
        <footer className='flex justify-between items-center'>
          <span className='font-medium text-base'>Senior level</span>
          <button className='bg-black-200 rounded-full px-4 py-2 text-base font-medium text-white'>Details</button>
        </footer>
      </article>
    )
}

export default StartupCard