import {
	faAmazon,
	faAudible,
	IconDefinition,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'
import { Button } from 'reactstrap'

export const BuyBookLink: React.FC<{
	link: string
	action?: string
	type?: string
	icon?: IconDefinition
}> = ({ link, action = 'Buy', type = 'E-Book', icon }) => {
	const withAction = `${action} ${type}`

	return (
		<a
			className="col-12 col-md-6 d-block"
			style={{
				textDecoration: 'none',
			}}
			href={link}
			target="_blank"
		>
			<Button
				style={{
					color: 'black',
					width: '100%',
					borderRadius: '4px',
					fontSize: '1rem',
					display: 'flex',
					alignItems: 'center',
					padding: '8px',
					backgroundColor: '#ff9900',
				}}
			>
				<FontAwesomeIcon
					fixedWidth
					style={{ marginTop: '4px', marginRight: '8px' }}
					icon={icon}
				/>
				<span className="d-inline d-md-none">{type}</span>
				<span className="d-none d-md-inline">{withAction}</span>
			</Button>
		</a>
	)
}
