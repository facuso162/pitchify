import { defineField, defineType } from 'sanity'

// Hay que mejorar este tipo
export const startupType = defineType({
  name: 'startup',
  title: 'Startup',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: rule => rule.required().error('Please enter a title'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'views',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: rule => rule.required().error('Please enter a description'),
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: rule => rule.min(1).max(20).required().error('Please enter a category'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
          validation: rule => rule.required().error('Please enter an alt text for the image'),
        },
      ],
      validation: rule => rule.required().error('Please enter an image'),
    }),
    defineField({
      name: 'pitch',
      type: 'markdown',
      validation: rule => rule.required().error('Please enter a pitch'),
    }),
  ],
})
