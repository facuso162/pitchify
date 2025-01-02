'use server'

import { STARTUPS_QUERY, STARTUP_DETAILS_QUERY } from '@/src/sanity/lib/queries'
import { client } from '@/src/sanity/lib/client'
import { writeClient } from '@/src/sanity/lib/write-client'
import slugify from 'slugify'
import { auth } from '@/auth'

export const getStartupsAction = async (startupsParams: { q: string | null }) => {
  const startups = await client.fetch(STARTUPS_QUERY, startupsParams)
  return startups
}

export const getStartupDetailsAction = async (slug: string) => {
  const startup = await client.fetch(STARTUP_DETAILS_QUERY, { slug })
  return startup
}

export const increaseStartupViewsAction = async (id: string) => {
  await writeClient.patch(id).inc({ views: 1 }).commit()
}

type StartupCreationData = {
  title: string
  description: string
  category: string
  pitch: string
  image: File
}

export const createStartupAction = async (startupCreationData: StartupCreationData) => {
  const { title, description, category, pitch, image } = startupCreationData

  const session = await auth()

  if (session === null || session.authorID === undefined) throw new Error('User not authenticated')

  const asset = await writeClient.assets.upload('image', image, {
    filename: image.name,
  })

  const newStartup = {
    _type: 'startup',
    title: title,
    description: description,
    category: category,
    pitch: pitch,
    views: 0,
    slug: {
      _type: 'slug',
      current: slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g }),
    },
    author: {
      _type: 'reference',
      _ref: session.authorID,
    },
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    },
  }

  const createdStartup = await writeClient.create(newStartup)
  return createdStartup
}
