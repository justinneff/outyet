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

	const releaseDateInMilliseconds = releaseDate * 1000

	if (isAfter(releaseDateInMilliseconds, new Date())) {
		return `Out on ${format(releaseDate, 'MMMM do, yyyy')}`
	}

	return `Released on ${format(releaseDate, 'MMMM do, yyyy')}`
}
