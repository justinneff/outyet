import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactGA from 'react-ga'
import React from 'react'
import { Button } from 'reactstrap'
import { AnalyticsCategory } from '../../../foundation/enums/AnalyticsCategory'
import { ButtonLink } from './ButtonLink'

export const BuyBookLink: React.FC<{
	link: string
	action?: string
	type?: string
	icon?: IconDefinition
}> = ({ link, action = 'Buy', type = 'E-Book', icon }) => {
	const withAction = `${action} ${type}`

	const captureClickEvent = e => {
		ReactGA.event({
			category: AnalyticsCategory.BuyBookLink,
			action: `${type} button clicked in order to ${action}`,
			label: link,
		})
	}

	return (
		<ButtonLink
			onClick={captureClickEvent}
			to={link}
			size="lg"
			className="mx-2 w-100"
			target="_blank"
			text={withAction}
			color="warning"
			icon={<FontAwesomeIcon icon={icon} fixedWidth />}
		/>
	)
}
