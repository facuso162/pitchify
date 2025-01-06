'use server'

import { client } from '@/src/sanity/lib/client'
import { AUTHOR_BY_ID_QUERY } from '@/src/sanity/lib/queries'

export const getAuthorAction = async (authorID: string) => {
  const author = await client.fetch(AUTHOR_BY_ID_QUERY, { authorID })
  return author
}
