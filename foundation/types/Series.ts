import { Author } from './Author'
import { Book } from './Book'

export type Series = {
	links: any
	id: string
	authors: Author[]
	books: Book[]
	hashtags: string[]
	title: string
}
