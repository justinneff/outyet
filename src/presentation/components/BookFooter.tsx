import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ReactGA from 'react-ga'
import { AnalyticsCategory } from '../../../foundation/enums/AnalyticsCategory'

const BookFooter: React.FC = () => {
	return (
		<div
			onClick={() => {
				ReactGA.event({
					category: AnalyticsCategory.BookCalendarAlert,
					action: `Clicked footer to receive book release date notifications`,
				})
				window.location.href = 'https://outyet.net/calendar/books.ics'
			}}
			className="d-flex w-100"
			style={{
				cursor: 'pointer',
				alignItems: 'center',
				paddingLeft: '20px',
				backgroundColor: '#f90',
				position: 'fixed',
				height: '50px',
				bottom: 0,
				zIndex: 99,
			}}
		>
			<FontAwesomeIcon icon={faCalendar} />
			<span style={{ marginLeft: '10px' }}>
				Want an alert when a book is released? Click here to Add OutYet Books to
				your Calendar
			</span>
		</div>
	)
}

export default BookFooter
