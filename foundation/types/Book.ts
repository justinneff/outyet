import { Author } from './Author'
import { Genre } from './Genre'
import { Series } from './Series'

export type Book = {
	id: string
	author: Author
	buy_links: {
		book?: string
		audiobook?: string
		hardcover?: string
		paperback?: string
	}
	description: string
	genres: Genre[]
	image?: string
	hashtags?: string[]
	release_date?: string
	release_text?: string
	series?: Series
	series_index?: number
	title: string
}
