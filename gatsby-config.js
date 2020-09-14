/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	/* Your site config here */
	plugins: [
		{
			resolve: 'gatsby-transformer-yaml-full',
			options: {
				plugins: [
					'gatsby-yaml-full-markdown', // Enable !markdown tags
				],
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
