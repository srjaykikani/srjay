import type {
  DefaultNodeTypes,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/utils'

type NodeTypes = DefaultNodeTypes

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

interface RichTextProps {
  data: SerializedEditorState | null | undefined
  className?: string
  enableProse?: boolean
}

export function RichText({ data, className, enableProse = true }: RichTextProps) {
  if (!data) return null

  return (
    <ConvertRichText
      data={data}
      converters={jsxConverters}
      className={cn(
        {
          'prose prose-sm dark:prose-invert max-w-none': enableProse,
          'prose-p:text-muted-foreground prose-p:leading-relaxed': enableProse,
          'prose-headings:text-foreground prose-headings:font-semibold': enableProse,
          'prose-a:text-primary prose-a:no-underline hover:prose-a:underline': enableProse,
          'prose-strong:text-foreground': enableProse,
          'prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded': enableProse,
          'prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground': enableProse,
          'prose-li:text-muted-foreground': enableProse,
        },
        className,
      )}
    />
  )
}
