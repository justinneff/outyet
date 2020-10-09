import { Author } from './Author'
import { Book } from './Book'

export type Series = {
	series: {
		frontmatter: {
			link: any
			id: string
			authors: Author[]
			books: Book[]
			hashtags: string[]
			name: string
		}
	}
	series_index: number
}
