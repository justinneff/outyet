import React, { useEffect, useState } from 'react'

export const CountdownDigit: React.FC<{ value: string }> = ({ value }) => {
	const [flipping, setFlipping] = useState(false)
	const [currentValue, setCurrentValue] = useState(value)
	const [nextCurrentValue, setNextCurrentValue] = useState(value)
	useEffect(() => {
		setNextCurrentValue(currentValue)
		setFlipping(false)
		setTimeout(() => {
			setCurrentValue(() => value)
			setFlipping(true)
		}, 100)
	}, [value])

	return (
		<div className={`flip-digit ${flipping ? 'flipping' : ''}`}>
			<span className="flip-digit-next" data-digit={currentValue}></span>
			<span className="flip-digit-current" data-digit={nextCurrentValue}></span>
		</div>
	)
}
