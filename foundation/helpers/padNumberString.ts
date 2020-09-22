export function padNumberString(str: string, minLength: number) {
	const toAdd = minLength - str.length

	for (let i = 0; i < toAdd; i++) {
		str = `0${str}`
	}
	return str
}
