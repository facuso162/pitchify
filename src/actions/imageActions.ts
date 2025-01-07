import { writeClient } from '../sanity/lib/write-client'

export const uploadImageAction = async (image: File, imageName: string) => {
  const asset = await writeClient.assets.upload('image', image, {
    filename: imageName,
  })
  return asset
}
