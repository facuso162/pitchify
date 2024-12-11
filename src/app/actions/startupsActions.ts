'use server'

import { STARTUPS_QUERY } from '@/src/sanity/lib/queries'
import { client } from '@/src/sanity/lib/client'

export const getStartupsAction = async () => {
  const startups = await client.fetch(STARTUPS_QUERY)
  return startups
}
