export const formatStartupImageAltText = (startupTitle: string): string => {
  return `Image of ${startupTitle}`
}

export const formatAuthorImageAltText = (authorName: string): string => {
  return `${authorName}'s profile image`
}

// from 2024-12-08T21:46:46Z
// to 08/12/2024
export const formatDate = (date: string): string => {
  const slicedDate = date.slice(0, date.indexOf('T'))
  const [year, month, day] = slicedDate.split('-')
  const formatedDate = `${day}/${month}/${year}`
  return formatedDate
}
