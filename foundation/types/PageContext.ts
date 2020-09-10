export type PageContext<T> = {
  pageContext: {
    content: T
    hashTags?: Array<string>
    links: Array<{ to: string }>
  }
}
