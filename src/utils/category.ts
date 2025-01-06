import { categoriesList } from './consts'

export const getCategoryTitle = (categoryValue: string) => {
  const category = categoriesList.find(category => category.value === categoryValue)

  return category ? category.title : 'Invalid category'
}
