import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

import type { MediaMap } from './media'

type ProjectSeed = Omit<RequiredDataFromCollectionSlug<'projects'>, 'image' | 'technologies'> & {
  imageKey?: string
  technologyNames?: string[] // Skill names to look up
}

/**
 * Helper to create RichText content with multiple paragraphs
 */
function createRichText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        version: 1,
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const projects: ProjectSeed[] = [
  // Test Case 1: Featured project with all fields filled (Live URL + GitHub)
  {
    title: 'ChallengeRate',
    slug: 'challengerate',
    description:
      'A gamified productivity app that turns daily habits into challenges. Users can set goals, track progress, and compete with friends in real-time leaderboards.',
    technologyNames: ['React Native', 'TypeScript', 'Expo', 'Redux'],
    liveUrl: 'https://challengerate.app',
    githubUrl: 'https://github.com/srjaykikani/challengerate',
    featured: true,
    order: 100,
    imageKey: 'project-challengerate',
    content: createRichText([
      'ChallengeRate was born from the idea that productivity should be fun. As a solo developer, I noticed that most habit tracking apps felt like chores themselves. I wanted to create something that made people excited to complete their daily tasks.',
      'The app uses React Native with Expo for cross-platform development, allowing me to ship to both iOS and Android from a single codebase. Firebase handles the backend, providing real-time sync for leaderboards and user authentication.',
      'Key features include customizable challenges, friend groups, achievement badges, and weekly competitions. The gamification elements have proven effective, with early users reporting 40% higher habit completion rates compared to traditional apps.',
      'Technical highlights include offline-first architecture with automatic sync, push notifications for reminders and social interactions, and a custom animation system for satisfying micro-interactions.',
    ]),
    _status: 'published',
  },

  // Test Case 2: Featured project with Live URL only (no GitHub)
  {
    title: 'Dr. Vandna',
    slug: 'drvandna',
    description:
      'Professional medical practice website with appointment booking, patient portal, and telemedicine integration for a healthcare provider.',
    technologyNames: ['Next.js', 'Payload CMS', 'Tailwind CSS'],
    liveUrl: 'https://drvandna.com',
    // No GitHub (private client project)
    featured: true,
    order: 90,
    imageKey: 'project-drvandna',
    content: createRichText([
      'Dr. Vandna is a comprehensive healthcare platform built for a medical practice. The project required careful attention to patient privacy, accessibility, and HIPAA compliance.',
      'The frontend is built with Next.js and Tailwind CSS, providing a fast, responsive experience across all devices. Payload CMS powers the content management, allowing the client to update services, blog posts, and team information without developer intervention.',
      'Key integrations include Stripe for payment processing, Twilio for SMS appointment reminders, and a custom telemedicine solution built on WebRTC for video consultations.',
      'The patient portal features secure login, appointment history, prescription tracking, and secure messaging with the healthcare team. All sensitive data is encrypted at rest and in transit.',
    ]),
    _status: 'published',
  },

  // Test Case 3: Featured project with GitHub only (no Live URL)
  {
    title: 'React Form Builder',
    slug: 'react-form-builder',
    description:
      'An open-source drag-and-drop form builder component for React applications with JSON schema support and validation.',
    technologyNames: ['React', 'TypeScript', 'Storybook', 'Jest'],
    // No liveUrl (library, not deployed app)
    githubUrl: 'https://github.com/srjaykikani/react-form-builder',
    featured: true,
    order: 85,
    content: createRichText([
      'React Form Builder is an open-source library that provides a visual interface for creating complex forms. Users can drag and drop field types, configure validation rules, and export the result as JSON schema.',
      'Built with accessibility in mind, the form builder supports keyboard navigation, screen readers, and follows WAI-ARIA guidelines. The generated forms are equally accessible.',
      'The project uses DnD Kit for drag-and-drop functionality, providing smooth animations and touch support. Yup handles validation schema generation, and the component is fully tree-shakeable.',
      'With over 500 stars on GitHub and 2,000+ weekly npm downloads, the library has been adopted by several companies for their internal tools and admin panels.',
    ]),
    _status: 'published',
  },

  // Test Case 4: Featured project with many technologies
  {
    title: 'E-Cell SVNIT',
    slug: 'ecell-svnit',
    description:
      'Official website for the Entrepreneurship Cell of SVNIT featuring event management, startup showcase, and resource library for student entrepreneurs.',
    technologyNames: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'AWS'],
    liveUrl: 'https://ecellsvnit.in',
    githubUrl: 'https://github.com/ecellsvnit/website',
    featured: true,
    order: 80,
    imageKey: 'project-ecell',
    content: createRichText([
      'As Technical Lead of E-Cell SVNIT, I led the development of the official website serving over 5,000 students annually. The platform handles event registrations, workshop bookings, and startup resources.',
      'The tech stack includes React frontend with Redux for state management, Node.js/Express backend, and MongoDB for data storage. Payment integration with Razorpay enables ticket sales for premium events.',
      'Notable features include a startup directory showcasing alumni ventures, a resource library with curated entrepreneurship content, and a mentorship matching system connecting students with industry professionals.',
      'The website handled 10,000+ registrations during our flagship E-Summit event with zero downtime, thanks to load balancing and caching strategies implemented with AWS.',
    ]),
    _status: 'published',
  },

  // Test Case 5: Featured project with minimal content (no rich text content)
  {
    title: 'Educave',
    slug: 'educave',
    description:
      'E-learning platform with course management, video streaming, quizzes, and progress tracking for students and educators.',
    technologyNames: ['Next.js', 'PostgreSQL', 'AWS'],
    liveUrl: 'https://educave.in',
    featured: true,
    order: 70,
    imageKey: 'project-educave',
    // No content (testing minimal data)
    _status: 'published',
  },

  // Test Case 6: Non-featured project (should not appear on homepage)
  {
    title: 'Personal CLI Tools',
    slug: 'cli-tools',
    description:
      'A collection of command-line utilities for development workflow automation including git helpers, file organization, and project scaffolding.',
    technologyNames: ['Node.js'],
    githubUrl: 'https://github.com/srjaykikani/cli-tools',
    featured: false, // Not featured
    order: 50,
    content: createRichText([
      'This repository contains various CLI tools I use in my daily development workflow. The utilities are built with Node.js and designed to be composable and scriptable.',
      'Key tools include: a git branch cleaner, a project template generator, a bulk file renamer with regex support, and a code snippet manager.',
    ]),
    _status: 'published',
  },

  // Test Case 7: Project with no technologies
  {
    title: 'Design System',
    slug: 'design-system',
    description:
      'A comprehensive design system with Figma components and React implementations for consistent UI across products.',
    // No technologies (testing edge case)
    liveUrl: 'https://design.srjay.com',
    githubUrl: 'https://github.com/srjaykikani/design-system',
    featured: true,
    order: 75,
    content: createRichText([
      'This design system provides a unified visual language across all my projects. It includes design tokens, component library, and documentation.',
      'The system is built with React and styled with CSS custom properties for easy theming. Components are documented with Storybook and tested with Testing Library.',
    ]),
    _status: 'published',
  },

  // Test Case 8: Draft project (should not appear on frontend)
  {
    title: 'Secret Project',
    slug: 'secret-project',
    description: 'An upcoming project still in development. Stay tuned for updates!',
    featured: false,
    order: 10,
    _status: 'draft', // Draft status
  },

  // Test Case 9: Project with very long title and description
  {
    title: 'Enterprise Resource Planning System with Advanced Analytics and Machine Learning Integration',
    slug: 'enterprise-erp-system',
    description:
      'A comprehensive enterprise resource planning solution featuring real-time analytics, machine learning-powered forecasting, multi-tenant architecture, and seamless integration with existing business systems including SAP, Salesforce, and custom APIs.',
    technologyNames: ['Python', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GraphQL'],
    liveUrl: 'https://erp.example.com',
    githubUrl: 'https://github.com/example/enterprise-erp',
    featured: false,
    order: 60,
    content: createRichText([
      'This enterprise-grade ERP system was developed for a Fortune 500 client to streamline their operations across 50+ locations globally.',
      'The system features advanced demand forecasting using TensorFlow models trained on historical data, reducing inventory costs by 25% and improving delivery times.',
      'Built with a microservices architecture deployed on Kubernetes, the system handles 100,000+ daily transactions with 99.99% uptime.',
    ]),
    _status: 'published',
  },

  // Test Case 10: Project with no description
  {
    title: 'Weekend Hack',
    slug: 'weekend-hack',
    // No description (testing edge case)
    githubUrl: 'https://github.com/srjaykikani/weekend-hack',
    featured: false,
    order: 5,
    content: createRichText([
      'A quick weekend project experimenting with new technologies. Not production-ready but useful for learning.',
    ]),
    _status: 'published',
  },
]

export function getProjectsData(
  mediaMap: MediaMap,
  skillNameToId: Map<string, string>,
): RequiredDataFromCollectionSlug<'projects'>[] {
  return projects.map(({ imageKey, technologyNames, ...project }) => ({
    ...project,
    image: imageKey ? mediaMap[imageKey] : undefined,
    technologies: technologyNames
      ?.map((name) => skillNameToId.get(name.toLowerCase()))
      .filter((id): id is string => id !== undefined),
  }))
}

export async function seedProjects(payload: Payload, mediaMap: MediaMap): Promise<void> {
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

  const projectsData = getProjectsData(mediaMap, skillNameToId)

  for (const project of projectsData) {
    await payload.create({
      collection: 'projects',
      data: project,
      context: {
        disableRevalidate: true,
      },
    })
    payload.logger.info(`Created project: ${project.title}`)
  }
}
