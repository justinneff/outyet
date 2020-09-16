const path = require('path')
const { graphql } = require('gatsby')

exports.onPostBuild = ({ reporter }) => {
	reporter.info(`Build completed`)
}

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
	const bookTemplate = path.resolve(`src/templates/book.tsx`)
	const result = await graphql(`
		query {
			allBooksYaml {
				edges {
					node {
						id
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
}
