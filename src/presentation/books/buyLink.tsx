import React from 'react'
import { Link } from 'gatsby'

interface BuyLinkProps {
	link: any
}

const BuyLink: React.FC<BuyLinkProps> = ({ link }) => {
	const key = Object.keys(link).filter(l => link[l] !== null)[0]
	return (
		<Link target="__blank" to={link[key]}>
			<button className="buy-link">{`Buy ${key}`}</button>
		</Link>
	)
}

export default BuyLink
