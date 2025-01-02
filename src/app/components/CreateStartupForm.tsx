'use client'

import { Send } from 'lucide-react'
import { useActionState, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { startupSchema } from '@/src/validation'
import { createStartupAction } from '../actions/startupsActions'
import ImageUpload from './ImageUpload'

type CreateStartupFormErrors = {
  title?: string
  description?: string
  category?: string
  pitch?: string
  image?: string
}

const validateImageFormat = (image: File) => {
  const imageMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

  return imageMimeTypes.includes(image.type)
}

function CreateStartupForm() {
  const [pitch, setPitch] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)

  const handleFormSubmit = async (prevErrors: CreateStartupFormErrors, formData: FormData) => {
    const formValues = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      pitch,
    }

    try {
      const validatedFormValues = await startupSchema.parseAsync(formValues)

      if (image === null) throw new Error('Please upload an image')

      if (!validateImageFormat(image))
        throw new Error('Invalid image format (only .png, .jpg or .webp accepted)')

      const createdStartup = await createStartupAction({ ...validatedFormValues, image })
      console.log(createdStartup)
      return {}
    } catch (error) {
      console.log(error)
      // poner aca los errores
      return {}
    }
  }

  const [errors, formAction, isPending] = useActionState(handleFormSubmit, {})

  const onImageChange = (newImage: File) => {
    setImage(newImage)
  }

  return (
    <form action={formAction} className='flex flex-col gap-4 max-w-3xl w-full md:gap-8'>
      <div className='flex flex-col gap-2'>
        <label htmlFor='title' className='font-bold uppercase tracking-wide'>
          Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          className='border-2 border-black rounded-3xl px-2 py-2 text-sm font-medium'
          placeholder='The name of your startup'
          required
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='description' className='font-bold uppercase tracking-wide'>
          Description
        </label>
        <textarea
          name='description'
          id='description'
          className='border-2 border-black rounded-3xl px-2 py-2 text-sm font-medium resize-none h-24 pitchify-scrollbar overflow-hidden'
          placeholder='Short description of your startup idea. Let it rip'
          required
          maxLength={300}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='category' className='font-bold uppercase tracking-wide'>
          Category
        </label>
        <input
          type='text'
          name='category'
          id='category'
          className='border-2 border-black rounded-3xl px-2 py-2 text-sm font-medium'
          placeholder='Choose a category (e.g., Tech, Health, etc.)'
          required
        />
      </div>
      <div>
        <ImageUpload onChange={onImageChange} image={image} />
      </div>
      <div data-color-mode='light' className='flex flex-col gap-2'>
        <label htmlFor='pitch' className='font-bold uppercase tracking-wide'>
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={value => setPitch(value as string)}
          id='pitch'
          preview='edit'
          height={300}
          style={{ borderRadius: '1.5rem', overflow: 'hidden' }}
          className='border-2 border-black pitch-input-customization'
          textareaProps={{ placeholder: 'Briefly describe your idea and what problem it solves' }}
          previewOptions={{ disallowedElements: ['style'] }}
        />
      </div>
      <button
        type='submit'
        className='flex border-2 border-black rounded-3xl px-2 py-2 justify-center items-center gap-2 uppercase font-bold text-white bg-primary'
        disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit your pitch'}
        {!isPending && <Send size={20} />}
      </button>
    </form>
  )
}

export default CreateStartupForm
