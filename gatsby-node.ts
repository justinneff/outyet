import path from 'path'
import { ensureDirSync } from 'fs-extra'

import { createCalendar } from './operations/calendar/createCalendar'
import { createEventDataFromBook } from './operations/calendar/createEventDataFromBook'

export function onPostBuild({ reporter }) {
	reporter.info(`Build completed`)
}

export async function createPages({ graphql, actions }) {
	const { createPage } = actions
	const bookTemplate = path.resolve(`src/templates/book.tsx`)
	const result = await graphql(`
		query {
			allBooksYaml {
				edges {
					node {
						id
						title
						release_date
						release_text
						buy_links {
							book
							audiobook
						}
					}
				}
			}
		}
	`)

	result.data.allBooksYaml.edges.forEach(edge => {
		createPage({
			path: `${edge.node.id}`,
			component: bookTemplate,
			context: {
				id: edge.node.id,
			},
		})
	})

	const events = result.data.allBooksYaml.edges.map(e => {
		const node = e.node
		return createEventDataFromBook(node)
	})

	ensureDirSync('./public/calendar')

	const calendar = await createCalendar('Outyet: Books', 'books', events)
	calendar.saveSync('./public/calendar/books.ics')
}
