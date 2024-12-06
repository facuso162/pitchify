import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './authorType'
import { startupType } from './startupType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, startupType],
}
