/* eslint-disable @typescript-eslint/no-unused-vars */

// Se realiza una extension de los tipos Session y JWT para que TS
// detecte la propiedad authorID. Hay que importar NextAuth ya que
// los tipos que sobreescribimos se encuentran alli
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    authorID?: string
  }

  interface JWT {
    authorID?: string
  }
}
