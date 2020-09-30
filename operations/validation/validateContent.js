const ajv = require('ajv')
const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')
const yaml = require('yaml')
const colors = require('colors')
const logSymbols = require('log-symbols')

const BOOK_CONTENT_PATH = path.join(__dirname, '../../content/books')
const BOOK_SCHEMA_PATH = path.join(__dirname, '../../schemas/book.json')

const validator = ajv({ allErrors: true })

const BOOK_SCHEMA = require(BOOK_SCHEMA_PATH)
let contentValid = true

glob(`${BOOK_CONTENT_PATH}/*.yaml`, async (err, matches) => {
	for (let i = 0; i < matches.length; i++) {
		const rawContent = fs.readFileSync(matches[i], 'utf8')
		const content = yaml.parse(rawContent, {
			customTags: [
				{
					tag: '!markdown',
					identify: value => value instanceof string,
					resolve: (doc, cst) => {
						const value = rawContent.substr(
							cst.valueRange.start,
							cst.valueRange.end - cst.valueRange.start
						)
						return value
					},
				},
			],
		})

		const isvalid = await validator.validate(BOOK_SCHEMA, content)
		if (!isvalid) {
			contentValid = false
			console.error(logSymbols.error.red, matches[i].red)
			validator.errors.map(e => {
				const errorText = validator.errorsText([e])

				console.error(` - ${errorText.red.bold}`)
			})
		} else {
			const message = `${logSymbols.success.inverse} ${matches[i]}`.green
			console.log(message)
		}
	}
	if (!contentValid > 0) {
		process.exitCode = 1
	} else {
		process.exit(0)
	}
})
