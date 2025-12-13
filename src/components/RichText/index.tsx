import {
  type DefaultNodeTypes,
  type SerializedLinkNode,
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
  return relationTo === 'projects' ? `/projects/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

type Props = {
  data: SerializedEditorState
  enableProse?: boolean
  enableGutter?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = false, ...rest } = props

  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        {
          'max-w-none': !enableGutter,
          'mx-auto prose prose-sm md:prose-base dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
