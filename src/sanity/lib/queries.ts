import { defineQuery } from 'next-sanity'

export const STARTUPS_QUERY = defineQuery(
  `*[_type == 'startup' && (!defined($q) || title match $q || author->name match $q || category match $q) ]{
    'startupID': _id,
    'slug': slug.current,
    title, 
    description, 
    'imageAlt': image.alt, 
    'imageUrl':image.asset -> .url,
    category, 
    views, 
    _createdAt,
    author->{
        'authorID': _id,
        authProviderID,
        name,
        'imageAlt': image.alt,
        'imageUrl': image.asset -> .url,  
    },
}`
)

export const STARTUP_DETAILS_QUERY = defineQuery(
  `*[_type == 'startup' && slug.current == $slug ][0]{
    'startupID': _id,
    'slug': slug.current,
    title, 
    description, 
    'imageAlt': image.alt, 
    'imageUrl':image.asset -> .url,
    category, 
    _createdAt,
    pitch,
    author->{
        'authorID': _id,
        authProviderID,
        name,
        username,
        'imageAlt': image.alt,
        'imageUrl': image.asset -> .url,  
    },
}`
)

export const AUTHOR_BY_AUTHPROVIDER_ID_QUERY = defineQuery(
  `*[_type == "author" && authProviderID == $authProviderID][0]{
      'authorID': _id,
      authProviderID,
      name,
      username,
      'imageAlt': image.alt,
      'imageUrl': image.asset -> .url,  
  }`
)
