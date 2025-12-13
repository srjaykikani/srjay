import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

import type { MediaMap } from './media'

type ProfileData = {
  name: string
  title: string
  tagline?: string
  bio: RequiredDataFromCollectionSlug<'projects'>['content']
  avatar?: string
  photos?: { image: string }[]
  email: string
  phone?: string
  location?: string
  timezone?: string
  github?: string
  languages?: { language: string }[]
  socialLinks?: {
    platform: 'github' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'email'
    url: string
    label?: string
  }[]
  resumeUrl?: string
}

export function getProfileData(mediaMap: MediaMap): ProfileData {
  return {
    // Basic Info
    name: "Hey, I'm Jay!",
    title: 'Product Designer & Full Stack Developer',
    tagline:
      "I'm a product-minded designer and developer who builds digital experiences that solve real problems. I focus on the intersection of design, technology, and user needs.",

    // Languages
    languages: [
      { language: 'English' },
      { language: 'Hindi' },
      { language: 'Gujarati' },
      { language: 'Learning German' },
    ],

    // Bio with rich formatting
    bio: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: "I'm a product-minded designer and developer who builds digital experiences that solve real problems. I focus on the intersection of design, technology, and user needs—creating products that are both beautiful and functional.",
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'With 5+ years of experience, I specialize in React, Next.js, and TypeScript for frontend development, while being comfortable with Node.js, PostgreSQL, and AWS on the backend. I believe in writing clean, maintainable code and creating intuitive user interfaces.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Currently building tools for creators and businesses, with a passion for clean interfaces, thoughtful interactions, and systems that scale. When not designing, you can find me exploring new technologies, contributing to open source, or mentoring aspiring developers.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },

    // Media - Testing avatar and photos
    avatar: mediaMap['avatar'],
    photos: mediaMap['hero'] ? [{ image: mediaMap['hero'] }] : [],

    // Contact Info - Testing all contact fields
    email: 'srjaykikani@gmail.com',
    phone: '+91 81400 59722',
    location: 'Gujarat, India',
    timezone: 'Asia/Kolkata',

    // GitHub - For contribution graph
    github: 'srjaykikani',

    // Social Links - Testing all platform types
    socialLinks: [
      {
        platform: 'github',
        url: 'https://github.com/srjaykikani',
        label: 'GitHub',
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/_srjay',
        label: 'Twitter / X',
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/_srjay',
        label: 'Instagram',
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/srjaykikani',
        label: 'LinkedIn',
      },
      {
        platform: 'youtube',
        url: 'https://youtube.com/@srjay',
        label: 'YouTube',
      },
      {
        platform: 'email',
        url: 'mailto:srjaykikani@gmail.com',
        label: 'Email Me',
      },
    ],

    // Resume - Testing resume URL
    resumeUrl: 'https://srjay.com/resume.pdf',
  }
}

export async function seedProfile(payload: Payload, mediaMap: MediaMap): Promise<void> {
  const profileData = getProfileData(mediaMap)

  await payload.updateGlobal({
    slug: 'profile',
    data: profileData,
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info('Profile global updated')
}
