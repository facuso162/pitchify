'use server'

import { STARTUPS_QUERY, STARTUP_DETAILS_QUERY } from '@/src/sanity/lib/queries'
import { client } from '@/src/sanity/lib/client'
import { writeClient } from '@/src/sanity/lib/write-client'

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
