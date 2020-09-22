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
	return (
		<a
			style={{
				textDecoration: 'none',
				display: 'inline-block',
				marginRight: '4px',
			}}
			href={link}
			target="_blank"
		>
			<Button
				style={{
					color: 'black',
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
				/>{' '}
				{action} {type}
			</Button>
		</a>
	)
}
