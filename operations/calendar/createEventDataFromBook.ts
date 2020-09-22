import { EventData } from 'ical-generator'
import { Book } from '../../foundation/types/Book'

export function createEventDataFromBook(book: Book): EventData | undefined {
	if (!book.release_date) {
		return undefined
	}
	return {
		start: new Date(book.release_date),
		summary: `${book.title} Release`,
		allDay: true,
		description: `${book.title} Available Now.\n${
			book.buy_links.book ? book.buy_links.book : ''
		}`,
	}
}
