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
  const [updatedFields, setUpdatedFields] = useState<{
    name?: string
    username?: string
    bio?: string
    email?: string
    image?: File | null
  }>({})
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleFormSubmit = async () => {
    try {
      const validatedFormValues = await authorSchema.parseAsync(updatedFields)

      await updateAuthorAction(author.authorID, validatedFormValues)

      setUpdatedFields({})

      return {}
    } catch (error) {
      const errors: EditAuthorFormErrors = {}

      setUpdatedFields({})

      if (error instanceof z.ZodError) {
        const zodErrors = error.flatten().fieldErrors
        for (const error in zodErrors) {
          errors[error as 'name' | 'username' | 'email' | 'bio' | 'image'] = zodErrors[error]
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

  if (name === null || username === null || email === null || bio === null) {
    throw new Error('Getting null data for the author')
  }

  const handleInputsChange = (e: FormEvent<HTMLFormElement>): void => {
    if (formRef.current === null) return

    const formData = new FormData(formRef.current)

    const currentValues = {
      name: formData.get('name') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      bio: formData.get('bio') as string,
      image: formData.get('image') as File,
    }

    if (currentValues.name !== name) {
      setUpdatedFields(prevUpdatedFields => ({ ...prevUpdatedFields, name: currentValues.name }))
    } else {
      setUpdatedFields(prevUpdatedFields => ({ ...prevUpdatedFields, name: undefined }))
    }

    if (currentValues.username !== username) {
      setUpdatedFields(prevUpdatedFields => ({
        ...prevUpdatedFields,
        username: currentValues.username,
      }))
    } else {
      setUpdatedFields(prevUpdatedFields => ({
        ...prevUpdatedFields,
        username: undefined,
      }))
    }

    if (currentValues.email !== email) {
      setUpdatedFields(prevUpdatedFields => ({ ...prevUpdatedFields, email: currentValues.email }))
    } else {
      setUpdatedFields(prevUpdatedFields => ({ ...prevUpdatedFields, email: undefined }))
    }

    if (currentValues.bio !== bio) {
      setUpdatedFields(prevUpdatedFields => ({ ...prevUpdatedFields, bio: currentValues.bio }))
    } else {
      setUpdatedFields(prevUpdatedFields => ({ ...prevUpdatedFields, bio: undefined }))
    }

    if ((e.target as HTMLInputElement).name === 'image') {
      setUpdatedFields(prevUpdatedFields => ({ ...prevUpdatedFields, image: currentValues.image }))
    }
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
        defaultValue={bio}
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
        // - no cambio la data (osea que Object.keys(updatedFields).length === 0)
        disabled={isPending || Object.keys(updatedFields).length === 0}
        className='flex border-2 border-black rounded-3xl px-2 py-2 justify-center items-center gap-2 uppercase font-bold text-white bg-primary disabled:bg-primary-disabled disabled:border-primary-disabled'>
        {isPending ? 'Editing...' : 'Accept changes'}
      </button>
    </form>
  )
}

export default EditAuthorForm
