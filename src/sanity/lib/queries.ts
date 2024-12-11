import { defineQuery } from 'next-sanity'

export const STARTUPS_QUERY = defineQuery(
  `*[_type == 'startup' && (!defined($q) || title match $q || author->name match $q || category match $q) ]{
    'slug': slug.current,
    title, 
    description, 
    'imageAlt': image.alt, 
    'imageUrl':image.asset -> .url,
    category, 
    views, 
    _createdAt,
    author->{
        id,
        name,
        'imageAlt': image.alt,
        'imageUrl': image.asset -> .url,  
    },
}`
)

export const STARTUP_DETAILS_QUERY = defineQuery(
  `*[_type == 'startup' && slug.current == $slug ][0]{
    'slug': slug.current,
    title, 
    description, 
    'imageAlt': image.alt, 
    'imageUrl':image.asset -> .url,
    category, 
    views, 
    _createdAt,
    pitch,
    author->{
        id,
        name,
        username,
        'imageAlt': image.alt,
        'imageUrl': image.asset -> .url,  
    },
}`
)
