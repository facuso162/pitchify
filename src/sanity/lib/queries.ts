import { defineQuery } from 'next-sanity'

export const STARTUPS_QUERY = defineQuery(`
    *
    [_type == 'startup']
    {
    'slug': slug.current,
    title, 
    description, 
    image, 
    pitch, 
    category, 
    views, 
    _createdAt,
    author->{
        id,
        username,
        email,
        name,
        image,
        bio,     
    },
    }
`)
