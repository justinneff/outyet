export type PageContext<T> = {
	pageContext: {
		data: any
		hashTags?: Array<string>
		links: Array<{ to: string }>
	}
}
