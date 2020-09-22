import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Book } from '../../foundation/types/Book'

import BuyLink from '../presentation/books/buyLink'
import SeriesLink from '../presentation/books/seriesLink'
import '../../static/css/_book.scss'
import '../../static/css/_clock.scss'
import { Countdown } from '../presentation/components/Countdown'
import { BuyBookLink } from '../presentation/components/BuyBookLink'
import { faAmazon, faAudible } from '@fortawesome/free-brands-svg-icons'

const BookTemplate: React.FC<PageProps> = ({ data }) => {
	if (!data) {
		return null
	}

	const { edges } = (data as any).allBooksYaml
	const bookNode = edges[0].node as Book
	const buyAction =
		bookNode.release_date > new Date().getTime() / 1000 ? 'Pre-order' : 'Buy'
	const bookImage = bookNode.image || '/images/cover.jpg'

	console.log(bookNode.buy_links)

	return (
		<article className="book-page-root">
			<header className="hero book-hero">
				<div className="container-fluid h-100">
					<div className="row h-100" style={{ alignItems: 'center' }}>
						<section style={{ color: 'white' }} className="col-12 col-md-6">
							<div className="release-date-container">
								<h1 className="book-page-title">{bookNode.title}</h1>
								<sub className="book-page-author">{bookNode.author.name}</sub>
								<p className="book-page-description">{bookNode.description}</p>

								<Countdown to={bookNode.release_date!} />

								<section className="buy-links">
									<BuyBookLink
										icon={faAmazon}
										link={bookNode.buy_links[0].book}
										action={buyAction}
									/>
									<BuyBookLink
										icon={faAudible}
										type="Audiobook"
										link={bookNode.buy_links[1].audiobook}
										action={buyAction}
									/>
								</section>
							</div>
						</section>
						<section className="text-center col-12 col-md-6">
							<img className="book-page-image" src={bookImage} />
						</section>
					</div>
				</div>
			</header>
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
					type
					series_index
					author {
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
	}
`
