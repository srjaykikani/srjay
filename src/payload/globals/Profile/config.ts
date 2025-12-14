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
                description: 'Your professional title',
              },
            },
            {
              name: 'avatar',
              label: 'Profile Photo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main profile photo',
              },
            },
            {
              name: 'bio',
              label: 'About Me',
              type: 'richText',
              admin: {
                description: 'Bio shown in the Overview section',
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
