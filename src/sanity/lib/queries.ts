import { defineQuery } from 'next-sanity'

export const STARTUPS_QUERY = defineQuery(`
*[_type == 'startup' && (!defined($q) || title match $q || author->name match $q || category match $q) ]{
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
