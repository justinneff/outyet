import React, { useEffect, useState } from 'react'
import { padNumberString } from '../../../../foundation/helpers/padNumberString'
import { CountdownDigit } from './CountdownDigit'

export const CountdownPiece: React.FC<{
	value: number
	keyPrefix: string
	minDigits?: number
	max: number
}> = ({ value, keyPrefix, minDigits = 2, max }) => {
	const pieceCount = Math.max(minDigits, value.toString().length)

	let valueString = value.toString()

	const finalString = padNumberString(valueString, pieceCount)

	const pieces: React.ReactNode[] = []
	for (let i = 0; i < pieceCount; i++) {
		pieces.push(
			<CountdownDigit value={finalString[i]} key={`${keyPrefix}-${i}`} />
		)
	}

	return <div className="flip-item">{pieces.reverse()}</div>
}
