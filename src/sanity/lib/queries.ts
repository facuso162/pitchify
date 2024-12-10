import { defineQuery } from 'next-sanity'

export const STARTUPS_QUERY = defineQuery(`
*[_type == 'startup']{
    'slug': slug.current,
    title, 
    description, 
    'imageAlt': image.alt, 
    'imageUrl':image.asset -> .url,
    pitch, 
    category, 
    views, 
    _createdAt,
    author->{
        id,
        username,
        email,
        name,
        'imageAlt': image.alt,
        'imageUrl': image.asset -> .url,
        bio,     
    },
}
`)
