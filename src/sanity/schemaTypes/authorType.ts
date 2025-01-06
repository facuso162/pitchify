import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'authProviderID',
      type: 'string',
    }),
    defineField({
      name: 'name',
      type: 'string',
      validation: rule => rule.required().error('Please enter a name'),
    }),
    defineField({
      name: 'username',
      type: 'string',
      validation: rule => rule.required().error('Please enter an username'),
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: rule => rule.required().error('Please enter an email'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      type: 'string',
    }),
  ],
})
