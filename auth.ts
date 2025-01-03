import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { client } from '@/src/sanity/lib/client'
import { writeClient } from './src/sanity/lib/write-client'
import { AUTHOR_BY_AUTHPROVIDER_ID_QUERY } from './src/sanity/lib/queries'
import { SanityAssetDocument } from 'next-sanity'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ profile }) {
      if (profile === undefined) throw new Error('Authentication error')

      if (!profile.name || !profile.sub || !profile.email) throw new Error('Invalid profile data')

      const author = await client.fetch(AUTHOR_BY_AUTHPROVIDER_ID_QUERY, {
        authProviderID: profile.sub,
      })

      if (author) return true

      let asset: SanityAssetDocument | null = null
      if (profile.picture as string) {
        const authorImageFetchResponse = await fetch(profile.picture)

        if (authorImageFetchResponse.ok) {
          const authorImage = await authorImageFetchResponse.blob()

          asset = await writeClient.assets.upload('image', authorImage, {
            filename: profile.name,
          })
        }
      }

      const newAuthor = {
        _type: 'author',
        authProviderID: profile.sub,
        name: profile.name,
        username: profile.email.split('@')[0],
        email: profile.email,
        bio: '',
        image: asset
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id,
              },
            }
          : null,
      }

      await writeClient.create(newAuthor)
      return true
    },

    async jwt({ token, profile }) {
      // El profile solo se pasa la primera vez que se ejecuta la funcion
      // osea, cuando se crea una session.

      // Las proximas veces que se actualiza el token (consultando la session)
      // no se pasa el profile, y por lo tanto, hay que chequear que no sea
      // undefined.
      if (profile !== undefined) {
        const author = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_AUTHPROVIDER_ID_QUERY, {
            authProviderID: profile.sub || null,
          })

        token.authorID = author ? author.authorID : null
      }

      return token
    },

    async session({ session, token }) {
      Object.assign(session, { authorID: token.authorID })

      return session
    },
  },
})
