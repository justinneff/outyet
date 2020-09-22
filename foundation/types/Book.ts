import { Author } from './Author'
import { Series } from './Series'

export type Book = {
	author: Author
	buy_links: {
		book?: string
		audiobook?: string
	}
	description: string
	image?: string
	release_date?: string
	series: Series
	title: string
}
