import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { client } from '@/src/sanity/lib/client'
import { writeClient } from './src/sanity/lib/write-client'
import { AUTHOR_BY_AUTHPROVIDER_ID_QUERY } from './src/sanity/lib/queries'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ profile }) {
      const author = await client.fetch(AUTHOR_BY_AUTHPROVIDER_ID_QUERY, {
        authProviderID: profile?.sub,
      })

      // TODO - Falta poner la imagen, tanto la de google, como una por defecto
      if (author === null) {
        const newAuthor = {
          _type: 'author',
          authProviderID: profile?.sub,
          name: profile?.name,
          username: profile?.email?.split('@')[0],
          email: profile?.email,
          bio: '',
        }
        await writeClient.create(newAuthor)
      }

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
