import React from "react"
import { Link } from "gatsby"
import { Book } from "../../foundation/types/Book"
import { PageContext } from "../../foundation/types/PageContext"

const BookTemplate: React.FC<PageContext<Book>> = props => {
  const { pageContext } = props
  const { hashTags, content, links } = pageContext
  return (
    <div>
      <h1>{content.title}</h1>
      {content.image && <img src={content.image} />}
      <h4>{content.description}</h4>
    </div>
  )
}
export default BookTemplate
