import type { Payload } from 'payload'

export async function seedHeader(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            label: 'Portfolio',
            url: '/',
            newTab: false,
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Blog',
            url: '/blog',
            newTab: false,
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Gallery',
            url: '/gallery',
            newTab: false,
          },
        },
      ],
    },
  })

  payload.logger.info('Header global updated')
}
