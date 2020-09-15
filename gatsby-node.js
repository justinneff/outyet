const fs = require('fs')
const { graphql } = require('gatsby')
const yaml = require('js-yaml')
// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions

//   const result = await graphql(`
//   query {

//   }
//   `)

// 	createPage({
// 		path: element.path,
// 		component: require.resolve(`./src/templates/${element.type}.tsx`),
// 		context: {
// 			hashTags: element.hashTags,
// 			content: element.content,
// 			links: element.links,
// 		},
// 	})
// }
