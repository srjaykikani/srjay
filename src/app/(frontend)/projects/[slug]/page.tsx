import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

import type { Metadata } from 'next'
import type { Project } from '@/payload-types'

import config from '@payload-config'
import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { getMedia } from '@/lib/type-guards'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    depth: 0,
    limit: 100,
    pagination: false,
  })

  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })

  const project = docs[0]
  if (!project) return {}

  return {
    title: project.meta?.title || project.title,
    description: project.meta?.description || project.description,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  const project = docs[0] as Project | undefined
  if (!project) notFound()

  const image = getMedia(project.image)
  const tags = project.tags || []

  return (
    <main className="container max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to projects
      </Link>

      {image?.url && (
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mb-8">
          <Image
            src={image.url}
            alt={image.alt || `${project.title} screenshot`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-foreground mb-4">{project.title}</h1>

      {project.description && (
        <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tagItem, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-lg bg-secondary text-secondary-foreground"
            >
              {tagItem.tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4 mb-8">
        {project.liveUrl && (
          <Button render={<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
        )}
        {project.githubUrl && (
          <Button
            variant="outline"
            render={<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" />}
          >
            <Github className="w-4 h-4 mr-2" />
            Source Code
          </Button>
        )}
      </div>

      {project.content && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <RichText data={project.content} />
        </div>
      )}
    </main>
  )
}
