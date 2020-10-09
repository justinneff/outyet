import path from 'path'
import { ensureDirSync } from 'fs-extra'
import { isAfter, addDays, parse } from 'date-fns'

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
			allMarkdownRemark(filter: { frontmatter: { type: { eq: "book" } } }) {
				edges {
					node {
						frontmatter {
							id
							title
							release_date
							release_text
							links {
								audiobook
								kindle
								paperback
								hardcover
							}
						}
					}
				}
			}
		}
	`)

	result.data.allMarkdownRemark.edges.forEach(edge => {
		createPage({
			path: `/books/${edge.node.frontmatter.id}`,
			component: bookTemplate,
			context: {
				id: edge.node.frontmatter.id,
			},
		})
	})

	const sevenDaysAgo = addDays(new Date(), -7)

	const events = result.data.allMarkdownRemark.edges
		.filter(e =>
			isAfter(
				parse(e.node.frontmatter.release_date, 'MM/dd/yyyy', sevenDaysAgo),
				sevenDaysAgo
			)
		)
		.map(e => {
			const node = e.node.frontmatter
			return createEventDataFromBook(node)
		})

	ensureDirSync('./public/calendar')

	const calendar = await createCalendar('Outyet: Books', 'books', events)
	calendar.saveSync('./public/calendar/books.ics')
}
