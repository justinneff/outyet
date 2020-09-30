import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Book } from '../../foundation/types/Book'
import SEO from '../presentation/components/Seo'
import '../../static/css/_book.scss'
import '../../static/css/_clock.scss'
import { Countdown } from '../presentation/components/Countdown'
import { faAmazon, faAudible } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { parse } from 'date-fns'
import { AnalyticsCategory } from '../../foundation/enums/AnalyticsCategory'
import { SocialShare } from '../presentation/components/SocialShare'
import { ButtonLink } from '../presentation/components/ButtonLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { BuyLinkType } from '../../foundation/enums/BuyLinkType'
import { generateStructuredData } from '../../foundation/helpers/generateStructuredData'
import { getGenreIconName } from '../../foundation/helpers/getGenreIconName'

import { Head } from '../presentation/components/Head'

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

	return (
		<article className="book-page-root">
			<SEO
				structuredData={generateStructuredData(
					siteUrl,
					bookImage,
					bookNode,
					releaseDate
				)}
				lang="en"
				image={seoImage}
				title={`${bookNode.title}`}
				description={bookNode.description}
				article="book"
			/>
			<Head title={bookNode.title} />

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
							<img
								alt={bookNode.title}
								className="book-page-image d-block d-md-none"
								src={bookImage}
							/>
							<h1 className="book-page-title">{bookNode.title}</h1>
							<div className="py-1">
								<ButtonLink
									to={bookNode.author.id}
									text={bookNode.author.name}
									category={AnalyticsCategory.Navigation}
									icon={<FontAwesomeIcon icon={faUser} fixedWidth />}
									color="light"
									outline
								/>
							</div>
							{bookNode.series && (
								<div className=" py-1 d-block">
									<ButtonLink
										category={AnalyticsCategory.Navigation}
										to={bookNode.series.id}
										text={`#${bookNode.series_index!} - ${
											bookNode.series.title
										}`}
										outline
										icon={<FontAwesomeIcon icon={faBookOpen} fixedWidth />}
										color="light"
										size="sm"
									/>
								</div>
							)}

							<div className="py-1">
								{bookNode.genres.map(genre => (
									<ButtonLink
										key={genre.id}
										className="mr-2"
										target="_blank"
										category={AnalyticsCategory.GenreLink}
										to={`${genre.link}`}
										text={genre.name}
										icon={
											<FontAwesomeIcon
												icon={getGenreIconName(genre.icon)}
												fixedWidth
											/>
										}
										color="light"
										size="sm"
										outline
									/>
								))}
							</div>
							<p className="book-page-description">{bookNode.description}</p>
							{releaseDate && (
								<div>
									<Countdown to={releaseDate.getTime() / 1000} />{' '}
								</div>
							)}

							<header className="mt-2">{`${buyAction}:`}</header>
							<div>
								{bookNode.buy_links.book && (
									<ButtonLink
										to={bookNode.buy_links.book}
										target="_blank"
										type={BuyLinkType.EBook}
										className="text-left mr-2"
										size="lg"
										category={AnalyticsCategory.BuyBookLink}
										color="warning"
										icon={<FontAwesomeIcon icon={faAmazon} fixedWidth />}
										text={`${BuyLinkType.EBook}`}
									/>
								)}

								{bookNode.buy_links.audiobook && (
									<ButtonLink
										to={bookNode.buy_links.audiobook}
										target="_blank"
										type={BuyLinkType.Audiobook}
										category={AnalyticsCategory.BuyBookLink}
										className="text-left m-2"
										size="lg"
										color="warning"
										icon={<FontAwesomeIcon icon={faAudible} fixedWidth />}
										text={`${BuyLinkType.Audiobook}`}
									/>
								)}

								{bookNode.buy_links.hardcover && (
									<ButtonLink
										to={bookNode.buy_links.hardcover}
										target="_blank"
										type={BuyLinkType.Hardcover}
										category={AnalyticsCategory.BuyBookLink}
										className="text-left m-2"
										size="lg"
										color="warning"
										icon={<FontAwesomeIcon icon={faBook} fixedWidth />}
										text={`${BuyLinkType.Hardcover}`}
									/>
								)}

								{bookNode.buy_links.paperback && (
									<ButtonLink
										to={bookNode.buy_links.paperback}
										target="_blank"
										type={BuyLinkType.Paperback}
										category={AnalyticsCategory.BuyBookLink}
										className="text-left m-2"
										size="lg"
										color="warning"
										icon={<FontAwesomeIcon icon={faBookOpen} fixedWidth />}
										text={`${BuyLinkType.Paperback}`}
									/>
								)}
							</div>

							<SocialShare
								id={bookNode.id}
								hashtags={bookNode.hashtags || []}
								text={shareMessage}
							/>
						</div>
					</section>
					<section className="text-center d-none d-md-block col-12 col-md-6">
						<img className="book-page-image" src={bookImage} />
					</section>
				</div>
			</div>
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
					genres {
						id
						name
						icon
						link
					}
					type
					series_index
					author {
						id
						name
					}
					buy_links {
						audiobook
						book
						hardcover
						paperback
					}
					series {
						id
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
