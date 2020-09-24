import React from 'react'
import { graphql, PageProps, useStaticQuery } from 'gatsby'
import { Book } from '../../foundation/types/Book'
import SEO from '../presentation/components/Seo'
import '../../static/css/_book.scss'
import '../../static/css/_clock.scss'
import { Countdown } from '../presentation/components/Countdown'
import { BuyBookLink } from '../presentation/components/BuyBookLink'
import { faAmazon, faAudible } from '@fortawesome/free-brands-svg-icons'
import { Helmet } from 'react-helmet'
import { format, parse } from 'date-fns'
import BookFooter from '../presentation/components/BookFooter'

import { SocialShare } from '../presentation/components/SocialShare'

const BookTemplate: React.FC<PageProps> = ({ data }) => {
	if (!data) {
		return null
	}

	const queryData = data as any
	const { edges } = queryData.allBooksYaml

	const { siteUrl } = queryData.site.siteMetadata

	const bookNode = edges[0].node as Book

	const releaseDate = bookNode.release_date
		? parse(bookNode.release_date, 'M/d/yyyy', new Date())
		: undefined

	const buyAction =
		releaseDate.getTime() / 1000 > new Date().getTime() / 1000
			? 'Pre-order'
			: 'Buy'
	const bookImage = bookNode.image || '/images/cover.jpg'
	const seoImage = {
		src: bookImage,
		height: 700,
		width: 400,
	}

	const shareMessage =
		buyAction === 'Pre-order'
			? `Countdown to the release of ${bookNode.title} on ${bookNode.release_date} now at Outyet`
			: `${bookNode.title} is available now!`

	const structuredData = `
		{
			"@context": "https://schema.org/",
			"@type": "Event",
			"name": "${bookNode.title} Release",
			"startDate": "${releaseDate ? format(releaseDate, 'yyyy-MM-dd') : ''}",
			"endDate": "${releaseDate ? format(releaseDate, 'yyyy-MM-dd') : ''}",
			"eventStatus": "https://schema.org/EventScheduled",
			"eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
			"location": {
				"@type": "VirtualLocation",
				"url": "${bookNode.buy_links.book}"
			},
			"image": [
				"${siteUrl}${bookImage}"
			],
			"description": "${bookNode.description}"
		}
		`

	return (
		<article className="book-page-root">
			<SEO
				structuredData={structuredData}
				lang="en"
				image={seoImage}
				title={`${bookNode.title}`}
				description={bookNode.description}
				article="book"
			/>
			<Helmet>
				<title>{bookNode.title}</title>
			</Helmet>

			<div
				className="container h-100 d-flex w-100"
				style={{ minHeight: '100vh', paddingBottom: '40px' }}
			>
				<div
					className="row h-100 pb-5"
					style={{
						alignItems: 'center',
						alignSelf: 'center',
						justifySelf: 'center',
						alignContent: 'center',
						justifyContent: 'center',
					}}
				>
					<section className="text-center d-block d-md-none col-12 col-md-6"></section>
					<section style={{ color: 'white' }} className="col-12 col-md-6">
						<div className="release-date-container">
							<h1 className="book-page-title">{bookNode.title}</h1>
							<p className="book-page-author">{`${bookNode.author.name} · ${bookNode.genre}`}</p>

							<SocialShare
								id={bookNode.id}
								hashtags={bookNode.hashtags || []}
								text={shareMessage}
							/>
							<img
								alt={bookNode.title}
								className="book-page-image d-block d-md-none"
								src={bookImage}
							/>
							<p className="book-page-description">{bookNode.description}</p>

							{releaseDate && <Countdown to={releaseDate.getTime() / 1000} />}

							<section className="buy-links row">
								<BuyBookLink
									icon={faAmazon}
									link={bookNode.buy_links.book}
									action={buyAction}
								/>
								<BuyBookLink
									icon={faAudible}
									type="Audiobook"
									link={bookNode.buy_links.audiobook}
									action={buyAction}
								/>
							</section>
						</div>
					</section>
					<section className="text-center d-none d-md-block col-12 col-md-6">
						<img className="book-page-image" src={bookImage} />
					</section>
				</div>
			</div>
			{buyAction === 'Pre-order' && <BookFooter />}
		</article>
	)
}
export default BookTemplate

export const pageQuery = graphql`
	query($id: String!) {
		allBooksYaml(filter: { id: { eq: $id } }) {
			edges {
				node {
					description
					image
					id
					hashtags
					release_date
					title
					genre
					type
					series_index
					author {
						id
						name
					}
					buy_links {
						audiobook
						book
					}
					series {
						title
						links {
							amazon
						}
					}
				}
			}
		}

		site {
			siteMetadata {
				siteUrl: url
			}
		}
	}
`
