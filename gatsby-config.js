require('ts-node').register({
	compilerOptions: {
		esModuleInterop: true,
	},
})
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
	path: '.env',
})

module.exports = {
	mapping: {
		'MarkdownRemark.frontmatter.author': 'MarkdownRemark.frontmatter.id',
		'MarkdownRemark.frontmatter.series.series': 'MarkdownRemark.frontmatter.id',
		'MarkdownRemark.frontmatter.genre': 'MarkdownRemark.frontmatter.id',
	},
	siteMetadata: {
		keywords:
			'books, movies, games, tv shows, release dates, pre-order, audiobook, kindle, countdown',
		title: 'OutYet',
		titleTemplate: 'OutYet · %s',
		description:
			'OutYet is a community driven site that tracks release dates of various media including books, games, movies and TV shows.',
		url: 'https://outyet.net',
	},
	plugins: [
		`gatsby-plugin-netlify-cms`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-fontawesome-css`,
		'gatsby-plugin-sass',
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: ['roboto', 'raleway', 'work sans'],
				display: 'swap',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/`,
				name: 'markdown-pages',
			},
		},
		'gatsby-transformer-remark',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || '',
				head: false,
				pageTransitionDelay: 0,
				defer: true,
				cookieDomain: 'outyet.net',
			},
		},
	],
}
