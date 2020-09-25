import { Author } from './Author'
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
	genre: string
	image?: string
	hashtags?: string[]
	release_date?: string
	series?: Series
	series_index?: number
	title: string
}
