import { Author } from './Author'
import { Genre } from './Genre'
import { Series } from './Series'

export type Book = {
	id: string
	author: Author
	links: {
		kindle?: string
		audiobook?: string
		hardcover?: string
		paperback?: string
	}
	description: string
	genre: Genre[]
	picture?: string
	hashtags?: string[]
	release_date?: string
	release_text?: string
	series?: Series
	title: string
}
