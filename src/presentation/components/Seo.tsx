import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ title, lang, description, image: metaImage, article }) => {
	const { pathname } = useLocation()
	const { site } = useStaticQuery(query)

	const {
		defaultTitle,
		titleTemplate,
		keywords,
		defaultDescription,
		siteUrl,
	} = site.siteMetadata

	const seo = {
		title: title || defaultTitle,
		description: description || defaultDescription,
		url: `${siteUrl}${pathname}`,
	}
	const canonical = pathname ? `${siteUrl}${pathname}` : null

	const image = metaImage && metaImage.src ? `${siteUrl}${metaImage.src}` : null

	return (
		<Helmet
			htmlAttributes={{ lang }}
			title={seo.title}
			titleTemplate={titleTemplate}
			link={
				canonical
					? [
							{
								rel: 'canonical',
								href: canonical,
							},
					  ]
					: []
			}
		>
			<meta name="description" content={seo.description} />
			<meta name="keywords" content={keywords} />

			{metaImage && <meta name="og:image" content={image} />}
			{metaImage && <meta name="og:image:width" content={metaImage.width} />}
			{metaImage && <meta name="og:image:height" content={metaImage.height} />}
			{seo.url && <meta name="og:url" content={seo.url} />}
			{(article ? true : null) && <meta name="og:type" content="website" />}
			{seo.title && <meta name="og:title" content={seo.title} />}
			{seo.description && (
				<meta name="og:description" content={seo.description} />
			)}

			{metaImage && <meta name="twitter:image" content={image} />}
			{metaImage && <meta name="twitter:card" content="summary_large_image" />}
			{!metaImage && <meta name="twitter:card" content="summary" />}
			<meta name="twitter:creator" content="OutYet" />
			{seo.title && <meta name="twitter:title" content={seo.title} />}
			{seo.description && (
				<meta name="twitter:description" content={seo.description} />
			)}
		</Helmet>
	)
}

export default SEO

const query = graphql`
	query SEO {
		site {
			siteMetadata {
				keywords
				defaultTitle: title
				titleTemplate
				defaultDescription: description
				siteUrl: url
			}
		}
	}
`
