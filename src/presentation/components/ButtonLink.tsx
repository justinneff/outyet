import { Link } from 'gatsby'
import React from 'react'
import { Button } from 'reactstrap'
import ReactGA from 'react-ga'
import { AnalyticsCategory } from '../../../foundation/enums/AnalyticsCategory'

import { BuyLinkType } from '../../../foundation/enums/BuyLinkType'

export const ButtonLink: React.FC<{
	text: string
	to: string
	type?: BuyLinkType
	color: string
	outline?: boolean
	size?: string
	target?: string
	className?: string
	spacing?: number
	category: AnalyticsCategory
	onClick?: (e: any) => void
	icon?: React.ReactNode
}> = ({
	text,
	to,
	type,
	color,
	outline,
	size,
	icon,
	onClick,
	target,
	className,
	category,
	spacing = 2,
}) => {
	const onClickWrapper = (e: any) => {
		ReactGA.event({
			category: category,
			action: `Button click: ${text}`,
			label: to,
		})

		if (onClick) {
			onClick(e)
		}
	}

	return (
		<div className={`d-sm-block d-md-inline-block mr-${spacing} mb-${spacing}`}>
			<Link style={{ textDecoration: 'none' }} target={target} to={to}>
				<Button
					className={className}
					title={`${text} ${type ? type : ''}`}
					style={{ display: 'flex', alignItems: 'center', fontSize: '0.875em' }}
					onClick={onClickWrapper}
					size={size}
					color={color}
					outline={outline}
				>
					{icon && <div className="mr-2">{icon}</div>}{' '}
					<div className="flex-1">{text}</div>
				</Button>
			</Link>
		</div>
	)
}
