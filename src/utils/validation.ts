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
    .refine(
      image => {
        // Esta validacion es para cuando no se envia una imagen
        if (image.size === 0 && image.type === 'application/octet-stream') {
          return true
        }

        return validateImageFormat(image)
      },
      {
        message: 'Image format must be JPEG, PNG, or WEBP.',
      }
    )
    .nullable(),
})

export const authorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required.' })
    .max(120, { message: 'Name must not exceed 120 characters.' })
    .optional(),
  username: z
    .string()
    .trim()
    .min(1, { message: 'Username is required.' })
    .max(120, { message: 'Username must not exceed 120 characters.' })
    .refine(
      async username => {
        // TODO - Validar username unico
        // Simulación de comprobación en la base de datos
        const isUsernameAvailable = true // Cambia esto por la comprobación real
        return isUsernameAvailable
      },
      { message: 'Username is already in use.' }
    )
    .optional(),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required.' })
    .max(120, { message: 'Email must not exceed 120 characters.' })
    .email({ message: 'Email must be a valid email address.' })
    .refine(
      async email => {
        // TODO - Validar email unico
        // Simulación de comprobación en la base de datos
        const isEmailAvailable = true // Cambia esto por la comprobación real
        return isEmailAvailable
      },
      { message: 'Email is already in use.' }
    )
    .optional(),
  bio: z.string().trim().max(120, { message: 'Bio must not exceed 120 characters.' }).optional(),
  image: z
    .instanceof(File)
    .refine(image => image.size <= 5 * 1024 * 1024, {
      message: 'Image size must not exceed 5 MB.',
    })
    .refine(image => validateImageFormat(image), {
      message: 'Image format must be JPEG, PNG, or WEBP.',
    })
    .optional()
    .nullable(),
})
