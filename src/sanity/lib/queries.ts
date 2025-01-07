import { defineQuery } from 'next-sanity'

export const STARTUPS_QUERY = defineQuery(
  `*[_type == 'startup' && (!defined($q) || title match $q || author->name match $q || category match $q) ]{
    'startupID': _id,
    'slug': slug.current,
    title, 
    description, 
    'imageUrl':image.asset -> .url,
    category, 
    views, 
    _createdAt,
    author->{
        'authorID': _id,
        authProviderID,
        name,
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
    'imageUrl':image.asset -> .url,
    category, 
    _createdAt,
    pitch,
    author->{
        'authorID': _id,
        authProviderID,
        name,
        username,
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
      'imageUrl': image.asset -> .url,  
  }`
)

export const AUTHOR_BY_ID_QUERY = defineQuery(
  `*[_type == "author" && _id == $authorID][0] {
      'authorID': _id,
      authProviderID,
      name,
      username,
      bio,
      email,
      'imageUrl': image.asset -> .url,  
  }`
)

export const STARTUPS_BY_AUTHOR_ID_QUERY = defineQuery(
  `*[_type == 'startup' && author->_id == $authorID] {
    'startupID': _id,
    'slug': slug.current,
    title, 
    description, 
    'imageUrl':image.asset -> .url,
    category, 
    views, 
    _createdAt,
    author->{
        'authorID': _id,
        authProviderID,
        name,
        'imageUrl': image.asset -> .url,  
    },
  }`
)
