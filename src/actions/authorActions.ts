'use server'

import { client } from '@/src/sanity/lib/client'
import { writeClient } from '@/src/sanity/lib/write-client'
import {
  AUTHOR_BY_ID_QUERY,
  AUTHOR_BY_AUTHPROVIDER_ID_QUERY,
  AUTHOR_BY_USERNAME_QUERY,
  AUTHOR_BY_EMAIL_QUERY,
} from '@/src/sanity/lib/queries'
import { uploadImageAction } from './imageActions'
import { SanityAssetDocument } from 'next-sanity'
import { randomInt } from 'node:crypto'

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
  let author = getAuthorByUsernameAction(username)
  while (author !== null) {
    username = `${username}${randomInt(0, 1000)}`
    author = getAuthorByUsernameAction(username)
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
  // TODO - Hay que borrar la imagen que quedo colgada
  if (image !== undefined) {
    // es o un File o null (se borro)
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
  }

  const updatedAuthor = await writeClient
    .patch(authorID)
    .set({ ...authorUpdates, image: imageUpdate })
    .commit()
  return updatedAuthor
}
