'use server'

import { client } from '@/src/sanity/lib/client'
import { writeClient } from '@/src/sanity/lib/write-client'
import {
  AUTHOR_BY_ID_QUERY,
  AUTHOR_BY_AUTHPROVIDER_ID_QUERY,
  AUTHOR_BY_USERNAME_QUERY,
  AUTHOR_BY_EMAIL_QUERY,
} from '@/src/sanity/lib/queries'
import { uploadImageAction, getAuthorImageID, deleteImage } from './imageActions'
import { SanityAssetDocument } from 'next-sanity'
import { randomInt } from 'node:crypto'
import { IMAGE_ID_BY_AUTHOR_ID_QUERYResult } from '../sanity/types'

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

export const getAuthorByUsernameAction = async (username: string) => {
  const author = await client.fetch(AUTHOR_BY_USERNAME_QUERY, { username })

  return author
}

export const getAuthorByEmail = async (email: string) => {
  const author = await client.fetch(AUTHOR_BY_EMAIL_QUERY, { email })

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

  let username = email.split('@')[0]
  let author = await getAuthorByUsernameAction(username)
  while (author !== null) {
    username = `${username}${randomInt(0, 1000)}`
    author = await getAuthorByUsernameAction(username)
  }

  const newAuthor = {
    _type: 'author',
    authProviderID,
    name,
    username,
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

type AuthorUpdates = {
  name?: string
  username?: string
  email?: string
  bio?: string
  image?: File | null
}

export const updateAuthorAction = async (authorID: string, authorUpdates: AuthorUpdates) => {
  const { image } = authorUpdates

  let imageUpdate:
    | {
        _type: 'image'
        asset: {
          _type: 'reference'
          _ref: string
        }
      }
    | null
    | undefined = undefined

  let imageID: null | IMAGE_ID_BY_AUTHOR_ID_QUERYResult = null
  if (image !== undefined) {
    // es o un File o null (se borro)
    // de cualquier manera, se borra la anterior
    if (image !== null) {
      const asset = await uploadImageAction(image, image.name)
      imageUpdate = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      }
    } else {
      imageUpdate = null
    }

    imageID = await getAuthorImageID(authorID)
  }

  const updatedAuthor = await writeClient
    .patch(authorID)
    .set({ ...authorUpdates, image: imageUpdate })
    .commit()

  if (imageID !== null) {
    await deleteImage(imageID)
  }

  return updatedAuthor
}
