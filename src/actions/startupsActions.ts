'use server'

import {
  STARTUPS_QUERY,
  STARTUP_DETAILS_QUERY,
  STARTUPS_BY_AUTHOR_ID_QUERY,
  STARTUP_BY_SLUG_QUERY,
} from '@/src/sanity/lib/queries'
import { client } from '@/src/sanity/lib/client'
import { writeClient } from '@/src/sanity/lib/write-client'
import slugify from 'slugify'
import { uploadImageAction } from './imageActions'
import { randomInt } from 'node:crypto'

export const getStartupsAction = async (startupsParams: { q: string | null }) => {
  const startups = await client.fetch(STARTUPS_QUERY, startupsParams)
  return startups
}

export const getStartupDetailsAction = async (slug: string) => {
  const startup = await client.fetch(STARTUP_DETAILS_QUERY, { slug })
  return startup
}

export const getStartupBySlugAction = async (slug: string) => {
  const startup = await client.fetch(STARTUP_BY_SLUG_QUERY, { slug })

  return startup
}

export const getStartupsByAuthorIDAction = async (authorID: string) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_ID_QUERY, { authorID })
  return startups
}

export const increaseStartupViewsAction = async (id: string) => {
  await writeClient.patch(id).inc({ views: 1 }).commit()
}

type StartupCreationData = {
  title: string
  description: string
  category: string
  pitch: string
  image: File | null
}

export const createStartupAction = async (
  authorID: string,
  startupCreationData: StartupCreationData
) => {
  const { title, description, category, pitch, image } = startupCreationData

  let imageUpdate: {
    _type: 'image'
    asset: {
      _type: 'reference'
      _ref: string
    }
  } | null = null

  if (image !== null) {
    const asset = await uploadImageAction(image, image.name)
    imageUpdate = {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  }

  let slug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g, strict: true })
  let startup = await getStartupBySlugAction(slug)
  while (startup !== null) {
    slug = `${slug}${randomInt(0, 1000)}`
    startup = await getStartupBySlugAction(slug)
  }

  const newStartup = {
    _type: 'startup',
    title: title,
    description: description,
    category: category,
    pitch: pitch,
    views: 0,
    slug: {
      _type: 'slug',
      current: slug,
    },
    author: {
      _type: 'reference',
      _ref: authorID,
    },
    image: imageUpdate,
  }

  const createdStartup = await writeClient.create(newStartup)
  return createdStartup
}
