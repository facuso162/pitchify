import { z } from 'zod'

export const validateImageFormat = (image: File) => {
  const imageMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

  return imageMimeTypes.includes(image.type)
}

export const startupSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required.' })
    .max(60, { message: 'Title must not exceed 60 characters.' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Description is required.' })
    .max(120, { message: 'Description must not exceed 120 characters.' }),
  category: z.enum(
    [
      'ai-robotics',
      'ecommerce',
      'education',
      'fashion-style',
      'finance-crypto',
      'food-beverage',
      'gaming',
      'health-wellness',
      'logistics',
      'marketing',
      'proptech',
      'renewable-energy',
      'sustainability',
      'technology',
      'travel-tourism',
    ],
    { message: 'Please select a valid category from the list.' }
  ),
  pitch: z.string().trim().min(1, { message: 'Pitch is required.' }),
  image: z
    .instanceof(File)
    .refine(image => image.size <= 5 * 1024 * 1024, {
      message: 'Image size must not exceed 5 MB.',
    })
    .refine(image => validateImageFormat(image), {
      message: 'Image format must be JPEG, PNG, or WEBP.',
    })
    .nullable(),
})
})
