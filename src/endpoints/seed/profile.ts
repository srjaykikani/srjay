import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

import type { MediaMap } from './media'

type ProfileData = {
  name: string
  title: string
  bio: RequiredDataFromCollectionSlug<'projects'>['content']
  avatar?: string
  photos?: { image: string }[]
  email: string
  phone?: string
  location?: string
  timezone?: string
  github?: string
  socialLinks?: {
    platform: 'github' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'email'
    url: string
    label?: string
  }[]
  resumeUrl?: string
}

export function getProfileData(mediaMap: MediaMap): ProfileData {
  return {
    name: 'S R Jay',
    title: 'Product Designer & Developer',
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
                text: 'Currently building tools for creators and businesses, with a passion for clean interfaces, thoughtful interactions, and systems that scale. When not designing, you can find me exploring new technologies, contributing to open source, or working on side projects.',
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
    avatar: mediaMap['avatar'],
    photos: mediaMap['hero'] ? [{ image: mediaMap['hero'] }] : [],
    email: 'srjaykikani@gmail.com',
    phone: '+91 81400 59722',
    location: 'India',
    timezone: 'Asia/Kolkata',
    github: 'srjaykikani',
    socialLinks: [
      {
        platform: 'github',
        url: 'https://github.com/srjaykikani',
        label: 'GitHub',
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/_srjay',
        label: 'Twitter',
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
    ],
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
