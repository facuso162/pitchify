// from 2024-12-08T21:46:46Z
// to 08/12/2024
export const parseDate = (date: string): string => {
  const slicedDate = date.slice(0, date.indexOf('T'))
  const [year, month, day] = slicedDate.split('-')
  const formatedDate = `${day}/${month}/${year}`
  return formatedDate
}
