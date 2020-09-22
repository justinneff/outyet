import format from 'date-fns/format'
import isAfter from 'date-fns/isAfter'

export const determineReleaseDate = (
	releaseDate?: number,
	countdownStyle?: string,
	releaseDateTeaser?: string
) => {
	if (!releaseDate) {
		return 'Unknown'
	}

	const releaseDateInMillis = releaseDate * 1000

	if (isAfter(releaseDateInMillis, new Date())) {
		return `Out on ${format(releaseDateInMillis, 'MMMM do, yyyy')}`
	}

	return `Out Now, released on ${format(releaseDateInMillis, 'MMMM do, yyyy')}`
}
