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

module.exports = {
	/* Your site config here */
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-fontawesome-css`,
		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-transformer-yaml-full',
			options: {
				plugins: [
					'gatsby-yaml-full-markdown', // Enable !markdown tags
				],
			},
		},
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
			},
		},
	],
}
