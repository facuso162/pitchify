'use server'

import { client } from '@/src/sanity/lib/client'
import { writeClient } from '@/src/sanity/lib/write-client'
import { AUTHOR_BY_ID_QUERY, AUTHOR_BY_AUTHPROVIDER_ID_QUERY } from '@/src/sanity/lib/queries'
import { uploadImageAction } from './imageActions'
import { SanityAssetDocument } from 'next-sanity'

export const getAuthorAction = async (authorID: string) => {
  const author = await client.fetch(AUTHOR_BY_ID_QUERY, { authorID })
  return author
}

export const getAuthorByAuthProviderIDAction = async (
  authProviderID: string | null,
  useCdn: boolean = false
) => {
  const author = await client.withConfig({ useCdn }).fetch(AUTHOR_BY_AUTHPROVIDER_ID_QUERY, {
    authProviderID,
  })

  return author
}

type AuthorCreationData = {
  authProviderID?: string
  name: string
  email: string
  image: File | null
}

export const createAuthorAction = async ({
  authProviderID,
  name,
  email,
  image,
}: AuthorCreationData) => {
  let asset: SanityAssetDocument | null = null
  if (image !== null) {
    asset = await uploadImageAction(image, name)
  }

  const newAuthor = {
    _type: 'author',
    authProviderID,
    name,
    username: email.split('@')[0], // TODO - Validar que el username no haya sido usado
    email,
    bio: '',
    image: asset
      ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        }
      : null,
  }

  await writeClient.create(newAuthor)
}

// TODO - Agregar actualizacion de imagen
type AuthorUpdates = {
  name?: string
  username?: string
  email?: string
  bio?: string
}

export const updateAuthorAction = async (authorID: string, authorUpdates: AuthorUpdates) => {
  const updatedAuthor = await writeClient.patch(authorID).set(authorUpdates).commit()
  return updatedAuthor
}
