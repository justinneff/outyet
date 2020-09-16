import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { Book } from '../../foundation/types/Book'
import { determineReleaseDate } from '../../foundation/helpers/determineReleaseDate'
import BuyLink from '../presentation/books/buyLink'
import SeriesLink from '../presentation/books/seriesLink'

const BookTemplate: React.FC<PageProps> = ({ data }) => {
	if (!data) {
		return null
	}

	const { edges } = (data as any).allBooksYaml
	const bookNode = edges[0].node as Book

	return (
		<div>
			<h1>{bookNode.title}</h1>
			<h3>{bookNode.author.name}</h3>
			<h3>{determineReleaseDate(bookNode.release_date)}</h3>
			{bookNode.image ? <img src={bookNode.image} /> : <div>No image yet</div>}
			<div>
				{bookNode.buy_links &&
					bookNode.buy_links.map((link, i) => {
						return <BuyLink key={i} link={link} />
					})}
			</div>
			<h4>{bookNode.description}</h4>
			<h4>Buy the Series</h4>
			{bookNode.series.links &&
				bookNode.series.links.map((link, i) => {
					return <SeriesLink key={i} link={link} />
				})}
		</div>
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
