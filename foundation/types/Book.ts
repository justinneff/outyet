import { Author } from './Author'
import { Series } from './Series'

export type Book = {
	author: Author
	buy_links: any[]
	description: string
	image?: string
	release_date?: number
	series: Series
	title: string
}
