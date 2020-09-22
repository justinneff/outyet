const ical = require('ical-generator')
import { EventData } from 'ical-generator'

export async function createCalendar(
	name: string,
	category: 'books' | 'movies' | 'games' | 'shows',
	events: Array<EventData>
) {
	const cal = ical({
		domain: 'outyet.net',
		prodId: { company: 'outyet', product: category },
		name,
		url: `https://outyet.net/calendar/${category}.ics`,
	})

	// Refresh every 12 hours
	cal.ttl(60 * 60 * 12)

	events.forEach(ev => {
		cal.createEvent(ev)
	})

	return cal
}
