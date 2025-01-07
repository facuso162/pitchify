'use client'

import { useActionState, useState, useRef, FormEvent } from 'react'
import { authorSchema } from '../utils/validation'
import { z } from 'zod'
import ImageUpload from './ImageUpload'
import { updateAuthorAction } from '../actions/authorActions'

type Author = {
  authorID: string
  authProviderID: string | null
  name: string | null
  username: string | null
  bio: string | null
  email: string | null
  imageUrl: string | null
}

type EditAuthorFormProps = {
  author: Author
}

type EditAuthorFormErrors = {
  name?: string
  username?: string
  email?: string
  bio?: string
  image?: string
}

function EditAuthorForm({ author }: EditAuthorFormProps) {
  const [hasFormChanged, setHasFormChanged] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleFormSubmit = async (_: EditAuthorFormErrors, formData: FormData) => {
    const formValues = {
      name: formData.get('name'),
      username: formData.get('username'),
      email: formData.get('email'),
      bio: formData.get('bio'),
      image: formData.get('image'),
    }

    try {
      const validatedFormValues = await authorSchema.parseAsync(formValues)

      await updateAuthorAction(author.authorID, validatedFormValues)

      return {}
    } catch (error) {
      const errors: EditAuthorFormErrors = {}

      if (error instanceof z.ZodError) {
        const zodErrors = error.flatten().fieldErrors
        for (const error in zodErrors) {
          errors[error as 'name' | 'username' | 'email' | 'bio'] = zodErrors[error]
            ? zodErrors[error][0]
            : 'Unexpected error'
        }
      } else {
        throw error
      }

      return errors
    }
  }

  const [errors, formAction, isPending] = useActionState(handleFormSubmit, {})

  const { name, username, imageUrl: authorImageURL, bio, email } = author

  if (name === null || username === null || email === null) {
    throw new Error('Getting null data for the author')
  }

  const handleInputsChange = (e: FormEvent<HTMLFormElement>): void => {
    if (formRef.current === null) return

    const formData = new FormData(formRef.current)

    const currentValues = {
      name: formData.get('name'),
      username: formData.get('username'),
      email: formData.get('email'),
      bio: formData.get('bio'),
      image: formData.get('image'),
    }

    if ((e.target as HTMLInputElement).id === 'image') {
      setHasFormChanged(true)
      return
    }

    setHasFormChanged(
      currentValues.name !== name ||
        currentValues.username !== username ||
        currentValues.email !== email ||
        currentValues.bio !== (bio || '')
    )
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onInput={handleInputsChange}
      className='flex flex-col gap-4 max-w-3xl w-full md:gap-8'>
      <label htmlFor='name' className='font-bold uppercase tracking-wide text-black'>
        Name
      </label>
      <input
        type='text'
        name='name'
        id='name'
        className='border-2 border-black rounded-3xl px-2 py-2 text-sm font-medium text-black'
        defaultValue={name}
      />
      {errors.name && (
        <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.name}</p>
      )}
      <label htmlFor='username' className='font-bold uppercase tracking-wide text-black'>
        Username
      </label>
      <div className='flex items-baseline border-2 border-black rounded-3xl px-2'>
        <span className='text-black font-bold text-xl'>@</span>
        <input
          type='text'
          name='username'
          id='username'
          className='grow rounded-3xl px-2 py-2 text-sm font-medium text-black focus:outline-none'
          defaultValue={username}
        />
      </div>
      {errors.username && (
        <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.username}</p>
      )}
      <label htmlFor='email' className='font-bold uppercase tracking-wide text-black'>
        Email
      </label>
      <input
        type='text'
        name='email'
        id='email'
        className='border-2 border-black rounded-3xl px-2 py-2 text-sm font-medium text-black'
        defaultValue={email}
      />
      {errors.email && (
        <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.email}</p>
      )}
      <label htmlFor='bio' className='font-bold uppercase tracking-wide text-black'>
        Bio
      </label>
      <textarea
        name='bio'
        id='bio'
        className='border-2 border-black rounded-3xl px-2 py-2 text-sm font-medium resize-none h-24 pitchify-scrollbar overflow-hidden text-black'
        defaultValue={bio || ''}
      />
      {errors.bio && (
        <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.bio}</p>
      )}
      <ImageUpload initialImageURL={authorImageURL ? authorImageURL : undefined} type='author' />
      {errors.image && (
        <p className='font-semibold text-sm text-red-600 tracking-wide'>{errors.image}</p>
      )}
      <button
        type='submit'
        // se desactiva el boton cuando
        // - se envio (osea que isPending = true)
        // - no cambio la data (osea que hasFormChanged = false)
        disabled={isPending || !hasFormChanged}
        className='flex border-2 border-black rounded-3xl px-2 py-2 justify-center items-center gap-2 uppercase font-bold text-white bg-primary disabled:bg-primary-disabled disabled:border-primary-disabled'>
        {isPending ? 'Editing...' : 'Accept changes'}
      </button>
    </form>
  )
}

export default EditAuthorForm
