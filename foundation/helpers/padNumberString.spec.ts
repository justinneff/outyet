import { padNumberString } from './padNumberString'
describe('padNumberString', () => {
	it('should correctly pad a number string', () => {
		expect(padNumberString('0', 2)).toEqual('00')
		expect(padNumberString('', 2)).toEqual('00')
		expect(padNumberString('123', 4)).toEqual('0123')
	})
})

export default {}
