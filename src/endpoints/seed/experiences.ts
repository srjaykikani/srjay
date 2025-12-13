import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

/**
 * Helper to create RichText content
 */
function createRichText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

type ExperienceSeed = Omit<RequiredDataFromCollectionSlug<'experiences'>, 'positions'> & {
  positions: Array<{
    title: string
    employmentType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'
    startDate: string
    endDate?: string
    description?: ReturnType<typeof createRichText>
    skillNames?: string[] // Skill names to look up
  }>
}

const experiences: ExperienceSeed[] = [
  // Test Case 1: Current employer with multiple positions (career growth at same company)
  {
    company: 'TechCorp Inc.',
    website: 'https://techcorp.example.com',
    isCurrentEmployer: true,
    positions: [
      {
        title: 'Senior Software Engineer',
        employmentType: 'full-time',
        startDate: '2023-06-01',
        endDate: undefined, // Current position
        description: createRichText(
          'Leading the frontend architecture team. Responsible for design system development, code reviews, and mentoring junior developers. Implemented micro-frontend architecture that improved deployment velocity by 40%.',
        ),
        skillNames: ['React', 'TypeScript'],
      },
      {
        title: 'Software Engineer',
        employmentType: 'full-time',
        startDate: '2021-03-01',
        endDate: '2023-05-31',
        description: createRichText(
          'Built and maintained customer-facing web applications. Led migration from JavaScript to TypeScript. Improved application performance by 60% through code optimization and lazy loading.',
        ),
        skillNames: ['React', 'JavaScript'],
      },
      {
        title: 'Junior Software Engineer',
        employmentType: 'full-time',
        startDate: '2020-01-15',
        endDate: '2021-02-28',
        description: createRichText(
          'Started as a junior developer working on bug fixes and small features. Quickly ramped up to handle larger projects and received early promotion.',
        ),
        skillNames: ['JavaScript', 'Git'],
      },
    ],
    order: 100,
  },

  // Test Case 2: Past employer with single position (full-time)
  {
    company: 'StartupXYZ',
    website: 'https://startupxyz.io',
    isCurrentEmployer: false,
    positions: [
      {
        title: 'Full Stack Developer',
        employmentType: 'full-time',
        startDate: '2018-06-01',
        endDate: '2019-12-31',
        description: createRichText(
          'Early employee at a Series A startup. Built the entire frontend from scratch and contributed to backend API development. Helped grow the engineering team from 3 to 12 members.',
        ),
        skillNames: ['Node.js', 'PostgreSQL', 'AWS'],
      },
    ],
    order: 90,
  },

  // Test Case 3: Contract position
  {
    company: 'Enterprise Solutions Ltd.',
    website: 'https://enterprise-solutions.example.com',
    isCurrentEmployer: false,
    positions: [
      {
        title: 'Frontend Consultant',
        employmentType: 'contract',
        startDate: '2019-01-01',
        endDate: '2019-11-30',
        description: createRichText(
          'Contracted to modernize legacy jQuery application to React. Delivered project 2 weeks ahead of schedule. Provided documentation and training for internal team.',
        ),
        skillNames: ['React'],
      },
    ],
    order: 85,
  },

  // Test Case 4: Current freelance/self-employed
  {
    company: 'Freelance',
    website: 'https://srjay.com',
    isCurrentEmployer: true,
    positions: [
      {
        title: 'Product Designer & Developer',
        employmentType: 'freelance',
        startDate: '2020-01-01',
        endDate: undefined, // Ongoing
        description: createRichText(
          'Building digital products for startups and businesses worldwide. Specializing in full-stack development with modern technologies, UI/UX design, and product strategy consulting. Clients include healthcare, education, and e-commerce sectors.',
        ),
        skillNames: ['Next.js', 'React', 'TypeScript', 'Figma'],
      },
    ],
    order: 95,
  },

  // Test Case 5: Internship
  {
    company: 'Big Tech Company',
    website: 'https://bigtech.example.com',
    isCurrentEmployer: false,
    positions: [
      {
        title: 'Software Engineering Intern',
        employmentType: 'internship',
        startDate: '2017-05-01',
        endDate: '2017-08-31',
        description: createRichText(
          'Summer internship in the Developer Tools team. Built an internal dashboard for monitoring CI/CD pipelines. Received return offer for full-time position.',
        ),
        skillNames: ['Python', 'React'],
      },
    ],
    order: 60,
  },

  // Test Case 6: Part-time position (student organization) with multiple roles
  {
    company: 'E-Cell SVNIT',
    website: 'https://ecellsvnit.in',
    isCurrentEmployer: false,
    positions: [
      {
        title: 'Technical Lead',
        employmentType: 'part-time',
        startDate: '2022-06-01',
        endDate: '2023-05-31',
        description: createRichText(
          'Led the technical team for the Entrepreneurship Cell. Built and maintained the official website, managed event registration systems, and mentored junior developers. Organized hackathons with 500+ participants.',
        ),
      },
      {
        title: 'Web Developer',
        employmentType: 'part-time',
        startDate: '2021-06-01',
        endDate: '2022-05-31',
        description: createRichText(
          'Developed and maintained event landing pages. Integrated payment gateways for event registrations. Collaborated with design team on UI/UX improvements.',
        ),
        skillNames: ['React'],
      },
    ],
    order: 80,
  },

  // Test Case 7: Position with no description and no skills (minimal data)
  {
    company: 'Quick Gig Co.',
    isCurrentEmployer: false,
    positions: [
      {
        title: 'Freelance Developer',
        employmentType: 'freelance',
        startDate: '2019-03-01',
        endDate: '2019-04-30',
        // No description
        // No skills
      },
    ],
    order: 50,
  },

  // Test Case 8: Company with no website
  {
    company: 'Local Business Solutions',
    // No website
    isCurrentEmployer: false,
    positions: [
      {
        title: 'IT Consultant',
        employmentType: 'contract',
        startDate: '2018-01-01',
        endDate: '2018-05-31',
        description: createRichText(
          'Provided IT consulting services for small local businesses. Set up websites, email systems, and basic automation.',
        ),
      },
    ],
    order: 55,
  },

  // Test Case 9: Open Source contributions (ongoing)
  {
    company: 'Open Source',
    website: 'https://github.com/srjaykikani',
    isCurrentEmployer: true,
    positions: [
      {
        title: 'Contributor',
        employmentType: 'freelance',
        startDate: '2018-01-01',
        endDate: undefined,
        description: createRichText(
          'Active contributor to various open source projects. Focus areas include developer tools, React ecosystem, and design systems. Maintainer of 3 npm packages with 10k+ weekly downloads.',
        ),
        skillNames: ['React', 'npm'],
      },
    ],
    order: 75,
  },

  // Test Case 10: Very long company name and many skills
  {
    company: 'International Digital Transformation & Innovation Consultancy Group',
    website: 'https://idticg.example.com',
    isCurrentEmployer: false,
    positions: [
      {
        title: 'Senior Digital Transformation Specialist & Technical Architect',
        employmentType: 'full-time',
        startDate: '2016-01-01',
        endDate: '2017-12-31',
        description: createRichText(
          'Led digital transformation initiatives for Fortune 500 clients. Architected cloud-native solutions and implemented DevOps practices. Managed cross-functional teams across 5 countries.',
        ),
        skillNames: ['AWS', 'Kubernetes', 'Docker', 'GraphQL'],
      },
    ],
    order: 65,
  },
]

export function getExperiencesData(): ExperienceSeed[] {
  return experiences
}

export async function seedExperiences(payload: Payload): Promise<void> {
  const experiencesData = getExperiencesData()

  // First, get all skills to create a lookup map
  const { docs: allSkills } = await payload.find({
    collection: 'skills',
    limit: 1000,
    depth: 0,
  })

  const skillNameToId = new Map<string, string>()
  for (const skill of allSkills) {
    skillNameToId.set(skill.name.toLowerCase(), skill.id)
  }

  for (const experience of experiencesData) {
    // Transform positions to include skill IDs
    const positions = experience.positions.map(({ skillNames, ...position }) => ({
      ...position,
      skills: skillNames
        ?.map((name) => skillNameToId.get(name.toLowerCase()))
        .filter((id): id is string => id !== undefined),
    }))

    await payload.create({
      collection: 'experiences',
      data: {
        ...experience,
        positions,
      },
      context: {
        disableRevalidate: true,
      },
    })
    payload.logger.info(`Created experience: ${experience.company}`)
  }
}
