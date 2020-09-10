export type PageContext<T> = {
  content: T
  hashTags?: Array<string>
  links: Array<{ to: string }>
}
