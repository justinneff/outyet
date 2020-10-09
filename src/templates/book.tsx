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
import { stripHtml } from '../../foundation/helpers/stripHtml'
import { Head } from '../presentation/components/Head'
import MarkdownContent from '../presentation/components/MarkdownContent'

const BookTemplate: React.FC<PageProps> = ({ data }) => {
	if (!data) {
		return null
	}

	const queryData = data as any
	const { edges } = queryData.allMarkdownRemark
	const { siteUrl } = queryData.site.siteMetadata

	const bookNode = edges[0].node.frontmatter as Book

	const releaseDate = bookNode.release_date
		? parse(bookNode.release_date, 'M/d/yyyy', new Date())
		: undefined

	const buyAction =
		releaseDate.getTime() / 1000 > new Date().getTime() / 1000
			? 'Pre-order'
			: 'Buy'
	const bookImage = bookNode.picture || '/images/cover.jpg'
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
				description={stripHtml(bookNode.description)}
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
								{bookNode.author.map(a => (
									<ButtonLink
										key={`author-${a.frontmatter.id}`}
										to={a.frontmatter.link}
										spacing={1}
										text={a.frontmatter.name}
										target="_blank"
										category={AnalyticsCategory.Navigation}
										icon={<FontAwesomeIcon icon={faUser} fixedWidth />}
										color="light"
										outline
									/>
								))}
							</div>
							{bookNode.series && (
								<div className=" py-1 d-block">
									<ButtonLink
										spacing={1}
										category={AnalyticsCategory.Navigation}
										to={bookNode.series.series.frontmatter.link}
										target="_blank"
										text={`#${bookNode.series.series_index!} - ${
											bookNode.series.series.frontmatter.name
										}`}
										outline
										icon={<FontAwesomeIcon icon={faBookOpen} fixedWidth />}
										color="light"
										size="sm"
									/>
								</div>
							)}

							<div className="py-1">
								{bookNode.genre.map(genre => (
									<ButtonLink
										spacing={1}
										key={genre.frontmatter.id}
										className="mr-2"
										target="_blank"
										category={AnalyticsCategory.GenreLink}
										to={`${genre.frontmatter.link}`}
										text={genre.frontmatter.name}
										icon={
											<FontAwesomeIcon
												icon={getGenreIconName(genre.frontmatter.icon)}
												fixedWidth
											/>
										}
										color="light"
										size="sm"
										outline
									/>
								))}
							</div>
							<MarkdownContent
								className="book-page-description"
								content={bookNode.description}
							/>
							{releaseDate && (
								<div>
									<Countdown
										to={releaseDate.getTime() / 1000}
										releaseText={bookNode.release_text}
									/>{' '}
								</div>
							)}

							<header className="mt-4">{`${buyAction}:`}</header>
							<div className="mt-1">
								{bookNode.links.kindle && (
									<ButtonLink
										to={bookNode.links.kindle}
										target="_blank"
										type={BuyLinkType.EBook}
										className="text-left"
										size="lg"
										category={AnalyticsCategory.BuyBookLink}
										color="warning"
										icon={<FontAwesomeIcon icon={faAmazon} fixedWidth />}
										text={`${BuyLinkType.EBook}`}
									/>
								)}

								{bookNode.links.audiobook && (
									<ButtonLink
										to={bookNode.links.audiobook}
										target="_blank"
										type={BuyLinkType.Audiobook}
										category={AnalyticsCategory.BuyBookLink}
										className="text-left"
										size="lg"
										color="warning"
										icon={<FontAwesomeIcon icon={faAudible} fixedWidth />}
										text={`${BuyLinkType.Audiobook}`}
									/>
								)}

								{bookNode.links.hardcover && (
									<ButtonLink
										to={bookNode.links.hardcover}
										target="_blank"
										type={BuyLinkType.Hardcover}
										category={AnalyticsCategory.BuyBookLink}
										className="text-left"
										size="lg"
										color="warning"
										icon={<FontAwesomeIcon icon={faBook} fixedWidth />}
										text={`${BuyLinkType.Hardcover}`}
									/>
								)}

								{bookNode.links.paperback && (
									<ButtonLink
										to={bookNode.links.paperback}
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
		allMarkdownRemark(filter: { frontmatter: { id: { eq: $id } } }) {
			edges {
				node {
					frontmatter {
						description
						picture
						id
						hashtags
						release_date
						release_text
						title
						genre {
							frontmatter {
								id
								name
								link
								icon
							}
						}
						type
						author {
							frontmatter {
								id
								name
								link
							}
						}
						links {
							audiobook
							kindle
							hardcover
							paperback
						}
						series {
							series {
								frontmatter {
									name
									link
								}
							}
							series_index
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
