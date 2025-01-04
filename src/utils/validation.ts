import { z } from 'zod'

export const validateImageFormat = (image: File) => {
  const imageMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

  return imageMimeTypes.includes(image.type)
}

export const startupSchema = z.object({
  title: z.string().max(50).trim().min(1),
  description: z.string().max(300).trim().min(1),
  category: z.string().max(20).trim().min(1),
  pitch: z.string().min(1),
})
