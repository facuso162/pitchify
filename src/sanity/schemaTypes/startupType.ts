import { defineField, defineType } from 'sanity'
import { categoriesList } from '@/src/utils/consts'

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
      validation: rule => rule.required().error('Please enter or generate a slug'),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
      validation: rule => rule.required().error('Please enter an author'),
    }),
    defineField({
      name: 'views',
      type: 'number',
      initialValue: 0,
      validation: rule => rule.required().error('Please enter a views number'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      validation: rule => rule.required().error('Please enter a description'),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: categoriesList,
      },
      validation: rule => rule.required().error('Please enter a category'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: rule => rule.required().error('Please enter an image'),
    }),
    defineField({
      name: 'pitch',
      type: 'markdown',
      validation: rule => rule.required().error('Please enter a pitch'),
    }),
  ],
})
