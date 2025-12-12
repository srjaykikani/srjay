import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

const experiences: RequiredDataFromCollectionSlug<'experiences'>[] = [
  {
    company: 'Freelance',
    title: 'Product Designer & Developer',
    startDate: '2023-01-01',
    endDate: undefined,
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Building digital products for startups and businesses. Full-stack development with modern technologies, UI/UX design, and product strategy consulting.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    website: 'https://srjay.com',
    order: 100,
  },
  {
    company: 'E-Cell SVNIT',
    title: 'Technical Lead',
    startDate: '2022-06-01',
    endDate: '2023-05-31',
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Led the technical team for the Entrepreneurship Cell. Built and maintained the official website, managed event registration systems, and mentored junior developers.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    website: 'https://ecellsvnit.in',
    order: 90,
  },
  {
    company: 'Open Source',
    title: 'Contributor',
    startDate: '2021-01-01',
    endDate: undefined,
    description: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Contributing to various open source projects. Focus areas include developer tools, React ecosystem, and design systems.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    website: 'https://github.com/srjaykikani',
    order: 80,
  },
]

export function getExperiencesData(): RequiredDataFromCollectionSlug<'experiences'>[] {
  return experiences
}

export async function seedExperiences(payload: Payload): Promise<void> {
  const experiencesData = getExperiencesData()

  for (const experience of experiencesData) {
    await payload.create({
      collection: 'experiences',
      data: experience,
      context: {
        disableRevalidate: true,
      },
    })
    payload.logger.info(`Created experience: ${experience.company} - ${experience.title}`)
  }
}
