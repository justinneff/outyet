import React from 'react'
import BookTemplate from '../templates/book'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default function BookPage(props) {
	return <BookTemplate {...props} />
}
