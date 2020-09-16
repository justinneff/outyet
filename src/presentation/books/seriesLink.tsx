import React from 'react'
import { Link } from 'gatsby'

interface SeriesLinkProps {
	link: any
}

const SeriesLink: React.FC<SeriesLinkProps> = ({ link }) => {
	const key = Object.keys(link).filter(l => link[l] !== null)[0]
	return (
		<Link target="__blank" to={link[key]}>
			<button>{`Buy from ${key}`}</button>
		</Link>
	)
}

export default SeriesLink
