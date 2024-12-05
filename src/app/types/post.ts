export type Post = {
  _createdAt: string
  views: number
  author: {
    _id: number
    firstName: string
    lastName: string
    profileImage: string
  }
  _id: number
  description: string
  image: string
  category: string
  title: string
}
