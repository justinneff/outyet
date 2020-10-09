import React from 'react'
import remark from 'remark'
import remarkHTML from 'remark-html'

const toHTML = value => remark().use(remarkHTML).processSync(value).toString()
const MarkdownContent: React.FC<{ content: string; className?: string }> = ({
	content,
	className,
}) => {
	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: toHTML(content) }}
		/>
	)
}
export default MarkdownContent
