import format from 'date-fns/format'
import { Book } from '../types/Book'

export function generateStructuredData(
	siteUrl: string,
	bookImagePath: string,
	book: Book,
	releaseDate: Date
) {
	return `
		{
			"@context": "https://schema.org/",
			"@type": "Event",
			"name": "${book.title} Release",
			"startDate": "${releaseDate ? format(releaseDate, 'yyyy-MM-dd') : ''}",
			"endDate": "${releaseDate ? format(releaseDate, 'yyyy-MM-dd') : ''}",
			"eventStatus": "https://schema.org/EventScheduled",
			"eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
			"location": {
				"@type": "VirtualLocation",
				"url": "${book.links.kindle}"
			},
			"image": [
				"${siteUrl}${bookImagePath}"
			],
			"description": "${book.description}"
		}
		`
}
