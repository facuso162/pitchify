/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: 'sanity.imagePaletteSwatch'
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: 'sanity.imagePalette'
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: 'sanity.imageDimensions'
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityFileAsset = {
  _id: string
  _type: 'sanity.fileAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type Geopoint = {
  _type: 'geopoint'
  lat?: number
  lng?: number
  alt?: number
}

export type Startup = {
  _id: string
  _type: 'startup'
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  author?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'author'
  }
  views?: number
  description?: string
  category?:
    | 'ai-robotics'
    | 'ecommerce'
    | 'education'
    | 'fashion-style'
    | 'finance-crypto'
    | 'food-beverage'
    | 'gaming'
    | 'health-wellness'
    | 'logistics'
    | 'marketing'
    | 'proptech'
    | 'renewable-energy'
    | 'sustainability'
    | 'technology'
    | 'travel-tourism'
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  pitch?: string
}

export type Slug = {
  _type: 'slug'
  current?: string
  source?: string
}

export type Author = {
  _id: string
  _type: 'author'
  _createdAt: string
  _updatedAt: string
  _rev: string
  authProviderID?: string
  name?: string
  username?: string
  email?: string
  image?: {
    asset?: {
      _ref: string
      _type: 'reference'
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: 'image'
  }
  bio?: string
}

export type SanityImageCrop = {
  _type: 'sanity.imageCrop'
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: 'sanity.imageHotspot'
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: 'sanity.imageAsset'
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: 'sanity.assetSourceData'
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: 'sanity.imageMetadata'
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type Markdown = string

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | Geopoint
  | Startup
  | Slug
  | Author
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | Markdown
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ./src/sanity/lib/queries.ts
// Variable: STARTUPS_QUERY
// Query: *[_type == 'startup' && (!defined($q) || title match $q || author->name match $q || category match $q) ]{    'startupID': _id,    'slug': slug.current,    title,     description,     'imageUrl':image.asset -> .url,    category,     views,     _createdAt,    author->{        'authorID': _id,        authProviderID,        name,        'imageUrl': image.asset -> .url,      },}
export type STARTUPS_QUERYResult = Array<{
  startupID: string
  slug: string | null
  title: string | null
  description: string | null
  imageUrl: string | null
  category:
    | 'ai-robotics'
    | 'ecommerce'
    | 'education'
    | 'fashion-style'
    | 'finance-crypto'
    | 'food-beverage'
    | 'gaming'
    | 'health-wellness'
    | 'logistics'
    | 'marketing'
    | 'proptech'
    | 'renewable-energy'
    | 'sustainability'
    | 'technology'
    | 'travel-tourism'
    | null
  views: number | null
  _createdAt: string
  author: {
    authorID: string
    authProviderID: string | null
    name: string | null
    imageUrl: string | null
  } | null
}>
// Variable: STARTUP_DETAILS_QUERY
// Query: *[_type == 'startup' && slug.current == $slug ][0]{    'startupID': _id,    'slug': slug.current,    title,     description,     'imageUrl':image.asset -> .url,    category,     _createdAt,    pitch,    author->{        'authorID': _id,        authProviderID,        name,        username,        'imageUrl': image.asset -> .url,      },}
export type STARTUP_DETAILS_QUERYResult = {
  startupID: string
  slug: string | null
  title: string | null
  description: string | null
  imageUrl: string | null
  category:
    | 'ai-robotics'
    | 'ecommerce'
    | 'education'
    | 'fashion-style'
    | 'finance-crypto'
    | 'food-beverage'
    | 'gaming'
    | 'health-wellness'
    | 'logistics'
    | 'marketing'
    | 'proptech'
    | 'renewable-energy'
    | 'sustainability'
    | 'technology'
    | 'travel-tourism'
    | null
  _createdAt: string
  pitch: string | null
  author: {
    authorID: string
    authProviderID: string | null
    name: string | null
    username: string | null
    imageUrl: string | null
  } | null
} | null
// Variable: STARTUP_BY_SLUG_QUERY
// Query: *[_type == 'startup' && slug.current == $slug ][0]{    'slug': slug.current,  }
export type STARTUP_BY_SLUG_QUERYResult = {
  slug: string | null
} | null
// Variable: STARTUPS_BY_AUTHOR_ID_QUERY
// Query: *[_type == 'startup' && author->_id == $authorID] {    'startupID': _id,    'slug': slug.current,    title,     description,     'imageUrl':image.asset -> .url,    category,     views,     _createdAt,    author->{        'authorID': _id,        authProviderID,        name,        'imageUrl': image.asset -> .url,      },  }
export type STARTUPS_BY_AUTHOR_ID_QUERYResult = Array<{
  startupID: string
  slug: string | null
  title: string | null
  description: string | null
  imageUrl: string | null
  category:
    | 'ai-robotics'
    | 'ecommerce'
    | 'education'
    | 'fashion-style'
    | 'finance-crypto'
    | 'food-beverage'
    | 'gaming'
    | 'health-wellness'
    | 'logistics'
    | 'marketing'
    | 'proptech'
    | 'renewable-energy'
    | 'sustainability'
    | 'technology'
    | 'travel-tourism'
    | null
  views: number | null
  _createdAt: string
  author: {
    authorID: string
    authProviderID: string | null
    name: string | null
    imageUrl: string | null
  } | null
}>
// Variable: AUTHOR_BY_AUTHPROVIDER_ID_QUERY
// Query: *[_type == "author" && authProviderID == $authProviderID][0]{      'authorID': _id,      authProviderID,      name,      username,      'imageUrl': image.asset -> .url,    }
export type AUTHOR_BY_AUTHPROVIDER_ID_QUERYResult = {
  authorID: string
  authProviderID: string | null
  name: string | null
  username: string | null
  imageUrl: string | null
} | null
// Variable: AUTHOR_BY_ID_QUERY
// Query: *[_type == "author" && _id == $authorID][0] {      'authorID': _id,      authProviderID,      name,      username,      bio,      email,      'imageUrl': image.asset -> .url,    }
export type AUTHOR_BY_ID_QUERYResult = {
  authorID: string
  authProviderID: string | null
  name: string | null
  username: string | null
  bio: string | null
  email: string | null
  imageUrl: string | null
} | null
// Variable: AUTHOR_BY_USERNAME_QUERY
// Query: *[_type == "author" && username == $username][0]    {'authorID': _id}
export type AUTHOR_BY_USERNAME_QUERYResult = {
  authorID: string
} | null
// Variable: AUTHOR_BY_EMAIL_QUERY
// Query: *[_type == "author" && email == $email][0]    {email}
export type AUTHOR_BY_EMAIL_QUERYResult = {
  email: string | null
} | null

// Query TypeMap
import '@sanity/client'
declare module '@sanity/client' {
  interface SanityQueries {
    "*[_type == 'startup' && (!defined($q) || title match $q || author->name match $q || category match $q) ]{\n    'startupID': _id,\n    'slug': slug.current,\n    title, \n    description, \n    'imageUrl':image.asset -> .url,\n    category, \n    views, \n    _createdAt,\n    author->{\n        'authorID': _id,\n        authProviderID,\n        name,\n        'imageUrl': image.asset -> .url,  \n    },\n}": STARTUPS_QUERYResult
    "*[_type == 'startup' && slug.current == $slug ][0]{\n    'startupID': _id,\n    'slug': slug.current,\n    title, \n    description, \n    'imageUrl':image.asset -> .url,\n    category, \n    _createdAt,\n    pitch,\n    author->{\n        'authorID': _id,\n        authProviderID,\n        name,\n        username,\n        'imageUrl': image.asset -> .url,  \n    },\n}": STARTUP_DETAILS_QUERYResult
    "*[_type == 'startup' && slug.current == $slug ][0]{\n    'slug': slug.current,\n  }": STARTUP_BY_SLUG_QUERYResult
    "*[_type == 'startup' && author->_id == $authorID] {\n    'startupID': _id,\n    'slug': slug.current,\n    title, \n    description, \n    'imageUrl':image.asset -> .url,\n    category, \n    views, \n    _createdAt,\n    author->{\n        'authorID': _id,\n        authProviderID,\n        name,\n        'imageUrl': image.asset -> .url,  \n    },\n  }": STARTUPS_BY_AUTHOR_ID_QUERYResult
    "*[_type == \"author\" && authProviderID == $authProviderID][0]{\n      'authorID': _id,\n      authProviderID,\n      name,\n      username,\n      'imageUrl': image.asset -> .url,  \n  }": AUTHOR_BY_AUTHPROVIDER_ID_QUERYResult
    "*[_type == \"author\" && _id == $authorID][0] {\n      'authorID': _id,\n      authProviderID,\n      name,\n      username,\n      bio,\n      email,\n      'imageUrl': image.asset -> .url,  \n  }": AUTHOR_BY_ID_QUERYResult
    '*[_type == "author" && username == $username][0]\n    {\'authorID\': _id}\n  ': AUTHOR_BY_USERNAME_QUERYResult
    '*[_type == "author" && email == $email][0]\n    {email}\n  ': AUTHOR_BY_EMAIL_QUERYResult
  }
}
