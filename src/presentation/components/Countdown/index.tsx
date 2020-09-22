import { format } from 'date-fns'
import React from 'react'
import { useEffect, useState } from 'react'

import { CountdownPiece } from './CountdownPiece'

export type CountdownProps = {
	to: number
}

export const Countdown: React.FC<CountdownProps> = ({ to }) => {
	const [currentDate, setCurrentDate] = useState(new Date().getTime() / 1000)
	const [remainingTime, setRemainingTime] = useState(0)
	const [refreshInterval, setRefreshInterval] = useState<any>(0)

	const [remainingDays, setRemainingDays] = useState(0)
	const [remainingHours, setRemainingHours] = useState(0)
	const [remainingMinutes, setRemainingMinutes] = useState(0)
	const [remainingSeconds, setRemainingSeconds] = useState(0)

	useEffect(() => {
		const seconds = Math.floor(remainingTime % 60)
		const minutes = Math.floor(((remainingTime - seconds) / 60) % 60)

		const minutesInSeconds = minutes * 60

		const hours = Math.floor(
			((remainingTime - minutesInSeconds - seconds) / 60 / 60) % 24
		)

		const hoursInSeconds = hours * 60 * 60

		const days = Math.floor(
			(remainingTime - hoursInSeconds - minutesInSeconds - seconds) /
				(60 * 60 * 24)
		)
		// const seconds = epoch % 60
		// const minutes = epoch - seconds % 60
		// const hours = (epoch - seconds - (minutes * 60)) % 24
		// const days = Math.floor((epoch - seconds - (minutes * 60) - (hours * 60 * 60)) / 24)

		setRemainingSeconds(seconds)
		setRemainingMinutes(minutes)
		setRemainingHours(hours)
		setRemainingDays(days)
	}, [
		remainingTime,
		setRemainingDays,
		setRemainingHours,
		setRemainingMinutes,
		setRemainingSeconds,
	])

	useEffect(() => {
		setRemainingTime(to - currentDate)
	}, [currentDate, to, setRemainingTime])

	useEffect(() => {
		if (refreshInterval) {
			clearInterval(refreshInterval)
		}
		setRefreshInterval(
			setInterval(() => {
				setCurrentDate(new Date().getTime() / 1000)
			}, 1000)
		)
	}, [to, setCurrentDate])

	if (remainingTime < 0) {
		return (
			<div className="released-on">
				Released on
				<br /> <b>{format(new Date(to * 1000), 'MMMM d, yyy')}</b>
			</div>
		)
	}
	return (
		<ul className="flip-clock-container">
			<CountdownPiece
				max={60}
				keyPrefix="Seconds"
				value={remainingSeconds}
				minDigits={2}
			/>
			<CountdownPiece
				max={60}
				keyPrefix="Minutes"
				value={remainingMinutes}
				minDigits={2}
			/>
			<CountdownPiece
				max={60}
				keyPrefix="Hours"
				value={remainingHours}
				minDigits={2}
			/>
			<CountdownPiece
				max={60}
				keyPrefix="Days"
				value={remainingDays}
				minDigits={2}
			/>
		</ul>
	)
}
