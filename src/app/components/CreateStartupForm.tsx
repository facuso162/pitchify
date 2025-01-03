'use client'

import { Send } from 'lucide-react'
import { useActionState, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { startupSchema } from '@/src/validation'
import { createStartupAction } from '../actions/startupsActions'
import ImageUpload from './ImageUpload'
import { z } from 'zod'
import { validateImageFormat } from '../utils/validation'
import { useRouter } from 'next/navigation'

type CreateStartupFormErrors = {
  title?: string
  description?: string
  category?: string
  pitch?: string
  image?: string
}

function CreateStartupForm() {
  const [pitch, setPitch] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)
  const router = useRouter()

  const handleFormSubmit = async (_: CreateStartupFormErrors, formData: FormData) => {
    const formValues = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      pitch,
    }

    try {
      const validatedFormValues = await startupSchema.parseAsync(formValues)

      if (image !== null && !validateImageFormat(image))
        throw new Error('Invalid image format (only .png, .jpg or .webp accepted)', {
          cause: 'image',
        })

      const createdStartup = await createStartupAction({ ...validatedFormValues, image })

      router.push(`/startup/${createdStartup.slug.current}`)

      return {}
    } catch (error) {
      const errors: CreateStartupFormErrors = {}

      if (error instanceof z.ZodError) {
        const zodErrors = error.flatten().fieldErrors
        for (const error in zodErrors) {
          errors[error as 'title' | 'description' | 'category' | 'pitch'] = zodErrors[error]
            ? zodErrors[error][0]
            : 'Unexpected error'
        }
      } else if (error instanceof Error && error.cause === 'image') {
        errors[error.cause] = error.message
      } else {
        throw error
      }

      return errors
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
        {errors.title && (
          <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.title}</p>
        )}
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
        {errors.description && (
          <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.description}</p>
        )}
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
        {errors.category && (
          <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.category}</p>
        )}
      </div>
      <ImageUpload onChange={onImageChange} image={image} />
      {errors.image && (
        <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.image}</p>
      )}
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
        {errors.pitch && (
          <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.pitch}</p>
        )}
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
