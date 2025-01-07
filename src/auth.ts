import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { client } from '@/src/sanity/lib/client'
import { writeClient } from './sanity/lib/write-client'
import { AUTHOR_BY_AUTHPROVIDER_ID_QUERY } from './sanity/lib/queries'
import { SanityAssetDocument } from 'next-sanity'
import type { Provider } from 'next-auth/providers'

const providers: Provider[] = [Google]

export const providersMap = providers.map(provider => {
  if (typeof provider === 'function') {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks: {
    async signIn({ profile }) {
      if (profile === undefined) throw new Error('Authentication error')

      if (!profile.name || !profile.sub || !profile.email) throw new Error('Invalid profile data')

      const author = await client.fetch(AUTHOR_BY_AUTHPROVIDER_ID_QUERY, {
        authProviderID: profile.sub,
      })

      if (author) return true

      let authorImage: File | null = null
      if (profile.picture as string) {
        const authorImageFetchResponse = await fetch(profile.picture)

        if (authorImageFetchResponse.ok) {
          authorImage = new File([await authorImageFetchResponse.blob()], profile.name)
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
  pages: {
    signIn: '/auth/signin',
  },
})
