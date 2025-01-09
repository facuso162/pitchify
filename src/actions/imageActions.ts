import { writeClient } from '../sanity/lib/write-client'
import { client } from '@/src/sanity/lib/client'
import { IMAGE_ID_BY_AUTHOR_ID_QUERY } from '@/src/sanity/lib/queries'

export const getAuthorImageID = async (authorID: string) => {
  const imageID = await client.fetch(IMAGE_ID_BY_AUTHOR_ID_QUERY, { authorID })

  return imageID
}

export const uploadImageAction = async (image: File, imageName: string) => {
  const asset = await writeClient.assets.upload('image', image, {
    filename: imageName,
  })
  return asset
}

export const deleteImage = async (imageID: string) => {
  const deletedImage = await writeClient.delete(imageID)

  return deletedImage
}
