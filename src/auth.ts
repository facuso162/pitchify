import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import type { Provider } from 'next-auth/providers'
import { getAuthorByAuthProviderIDAction, createAuthorAction } from './actions/authorActions'

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

      const author = await getAuthorByAuthProviderIDAction(profile.sub)

      if (author) return true

      let authorImage: File | null = null
      if (profile.picture as string) {
        const authorImageFetchResponse = await fetch(profile.picture)

        if (authorImageFetchResponse.ok) {
          authorImage = new File([await authorImageFetchResponse.blob()], profile.name)
        }
      }

      await createAuthorAction({
        authProviderID: profile.sub,
        name: profile.name,
        email: profile.email,
        image: authorImage,
      })

      return true
    },

    async jwt({ token, profile }) {
      // El profile solo se pasa la primera vez que se ejecuta la funcion
      // osea, cuando se crea una session.

      // Las proximas veces que se actualiza el token (consultando la session)
      // no se pasa el profile, y por lo tanto, hay que chequear que no sea
      // undefined.
      if (profile !== undefined) {
        const author = await getAuthorByAuthProviderIDAction(profile.sub || null, true)

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
