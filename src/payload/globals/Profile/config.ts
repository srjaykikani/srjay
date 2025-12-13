import type { GlobalConfig } from 'payload'

export const Profile: GlobalConfig = {
  slug: 'profile',
  label: 'Profile',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              name: 'name',
              label: 'Full Name',
              type: 'text',
              required: true,
              defaultValue: 'srjay',
            },
            {
              name: 'title',
              label: 'Job Title',
              type: 'text',
              required: true,
              admin: {
                description: 'Your professional title or tagline',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'avatar',
                  label: 'Profile Photo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Main profile photo',
                  },
                },
              ],
            },
            {
              name: 'tagline',
              label: 'Short Bio / Tagline',
              type: 'textarea',
              admin: {
                description: 'A short description shown in the hero section (2-3 sentences)',
              },
            },
            {
              name: 'bio',
              label: 'Full About Me',
              type: 'richText',
              admin: {
                description: 'Detailed bio for the About page (optional)',
              },
            },
            {
              name: 'languages',
              label: 'Languages',
              type: 'array',
              fields: [
                {
                  name: 'language',
                  label: 'Language',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Languages you speak',
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'email',
                  label: 'Email Address',
                  type: 'email',
                  required: true,
                },
                {
                  name: 'phone',
                  label: 'Phone Number',
                  type: 'text',
                  admin: {
                    description: 'Include country code (e.g., +91 12345 67890)',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'location',
                  label: 'Location',
                  type: 'text',
                  admin: {
                    description: 'City, Country',
                  },
                },
                {
                  name: 'timezone',
                  label: 'Timezone',
                  type: 'text',
                  admin: {
                    description: 'e.g., Asia/Kolkata',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Social & Links',
          fields: [
            {
              name: 'github',
              label: 'GitHub Username',
              type: 'text',
              defaultValue: 'srjaykikani',
              admin: {
                description: 'Used for contribution calendar',
              },
            },
            {
              name: 'socialLinks',
              label: 'Social Media Links',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      label: 'Platform',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'GitHub', value: 'github' },
                        { label: 'Twitter/X', value: 'twitter' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'Email', value: 'email' },
                      ],
                    },
                    {
                      name: 'label',
                      label: 'Display Label',
                      type: 'text',
                      admin: {
                        description: 'Optional custom label',
                      },
                    },
                  ],
                },
                {
                  name: 'url',
                  label: 'URL',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                initCollapsed: false,
              },
            },
            {
              name: 'resumeUrl',
              label: 'Resume URL',
              type: 'text',
              admin: {
                description: 'Link to your resume/CV PDF',
              },
            },
          ],
        },
        {
          label: 'Gallery',
          fields: [
            {
              name: 'photos',
              label: 'Hero Gallery Photos',
              type: 'array',
              maxRows: 5,
              fields: [
                {
                  name: 'image',
                  label: 'Photo',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
              admin: {
                description: 'Add 3-5 images for the hero gallery',
                initCollapsed: false,
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ req: { payload, context } }) => {
        if (!context.disableRevalidate) {
          const { revalidatePath, revalidateTag } = await import('next/cache')
          payload.logger.info('Revalidating profile global')
          revalidatePath('/')
          revalidateTag('global_profile')
        }
      },
    ],
  },
}
