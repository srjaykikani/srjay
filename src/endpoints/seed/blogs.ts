import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

import type { MediaMap } from './media'

interface RichTextChild {
  [k: string]: unknown
  type: string
  version: number
}

interface RichTextContent {
  root: {
    type: string
    children: RichTextChild[]
    direction: 'ltr' | 'rtl' | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
  [k: string]: unknown
}

type BlogSeed = Omit<RequiredDataFromCollectionSlug<'blogs'>, 'image' | 'content'> & {
  imageKey?: string
  content: RichTextContent
}

/**
 * Helper to create RichText content with headings and paragraphs
 */
function createRichText(
  sections: Array<{ heading?: string; paragraphs: string[] }>,
): RichTextContent {
  const children: RichTextChild[] = []

  for (const section of sections) {
    if (section.heading) {
      children.push({
        type: 'heading',
        tag: 'h2',
        children: [
          {
            type: 'text',
            text: section.heading,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })
    }

    for (const text of section.paragraphs) {
      children.push({
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
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      })
    }
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

const blogs: BlogSeed[] = [
  {
    title: 'Building a Portfolio with Payload CMS and Next.js',
    slug: 'building-portfolio-payload-nextjs',
    summary:
      'A deep dive into creating a modern portfolio website using Payload CMS as a headless CMS with Next.js 15 and React Server Components.',
    publishedAt: '2024-12-01',
    content: createRichText([
      {
        paragraphs: [
          'When I set out to rebuild my portfolio, I wanted a stack that would give me complete control over my content while maintaining the performance benefits of static site generation. After evaluating several options, I landed on Payload CMS with Next.js 15.',
        ],
      },
      {
        heading: 'Why Payload CMS?',
        paragraphs: [
          'Payload CMS stands out for several reasons. First, it\'s self-hosted, meaning you own your data and can deploy anywhere. Second, it\'s built with TypeScript from the ground up, providing excellent type safety. Third, it integrates seamlessly with Next.js since they both run in the same Node.js process.',
          'The admin panel is clean, customizable, and supports complex content relationships out of the box. For a portfolio site, this means I can easily link projects to technologies, experiences to skills, and more.',
        ],
      },
      {
        heading: 'React Server Components',
        paragraphs: [
          'Next.js 15 brings mature support for React Server Components. This means components render on the server by default, sending only HTML to the client. The result is faster initial page loads and smaller JavaScript bundles.',
          'For my portfolio, most pages are entirely server-rendered. The only client components are interactive elements like the theme toggle and scroll spy navigation.',
        ],
      },
      {
        heading: 'Key Takeaways',
        paragraphs: [
          'Building with this stack taught me the importance of thinking carefully about the server/client boundary. Not every component needs to be interactive, and keeping most things server-rendered leads to better performance.',
          'The combination of Payload CMS and Next.js is powerful for developers who want full control over their content and presentation. I highly recommend it for portfolio sites, blogs, and small business websites.',
        ],
      },
    ]),
    _status: 'published',
  },
  {
    title: 'My Journey from React to React Native',
    slug: 'react-to-react-native-journey',
    summary:
      'Lessons learned transitioning from web development with React to building mobile apps with React Native and Expo.',
    publishedAt: '2024-11-15',
    content: createRichText([
      {
        paragraphs: [
          'After years of building web applications with React, I decided to expand into mobile development. React Native seemed like the natural choice given my existing knowledge, but the transition had its challenges.',
        ],
      },
      {
        heading: 'The Similarities',
        paragraphs: [
          'The core concepts transfer directly: components, props, state, hooks, and the virtual DOM. If you understand React, you already know about 70% of what you need for React Native.',
          'State management solutions like Redux, Zustand, and React Query work identically. Your existing knowledge of async patterns, data fetching, and caching applies directly.',
        ],
      },
      {
        heading: 'The Differences',
        paragraphs: [
          'The biggest adjustment is styling. There\'s no CSS cascade, no pseudo-elements, and flexbox behaves differently (column is the default direction). You\'ll find yourself creating many more wrapper components.',
          'Navigation is completely different. React Router concepts don\'t apply; instead, you use libraries like React Navigation or Expo Router that handle native navigation patterns.',
          'Platform-specific code is inevitable. Despite the "write once, run anywhere" promise, you\'ll write if (Platform.OS === "ios") more than you expect.',
        ],
      },
      {
        heading: 'Expo Changed Everything',
        paragraphs: [
          'Expo dramatically lowers the barrier to entry. You don\'t need Xcode or Android Studio for basic apps. The Expo Go app lets you test on real devices instantly.',
          'With EAS (Expo Application Services), building and submitting to app stores is straightforward. What used to require complex native toolchain setup is now a few CLI commands.',
        ],
      },
      {
        heading: 'Advice for Web Developers',
        paragraphs: [
          'Start with Expo. Don\'t try to set up React Native CLI and native dependencies right away. Expo handles the complexity and you can eject later if needed.',
          'Learn the native patterns. Study how iOS and Android apps work. Users have expectations about navigation, gestures, and interactions that differ from web.',
          'Be patient with debugging. The feedback loop is slower than web development. Hot reload helps, but you\'ll miss the browser\'s developer tools.',
        ],
      },
    ]),
    _status: 'published',
  },
  {
    title: 'TypeScript Best Practices I Wish I Knew Earlier',
    slug: 'typescript-best-practices',
    summary:
      'Common TypeScript patterns and anti-patterns learned from building production applications over the past three years.',
    publishedAt: '2024-10-20',
    content: createRichText([
      {
        paragraphs: [
          'TypeScript has become essential to my development workflow, but my early TypeScript code was full of anti-patterns. Here are the lessons I\'ve learned that would have saved me countless hours.',
        ],
      },
      {
        heading: 'Stop Using any',
        paragraphs: [
          'The any type defeats the purpose of TypeScript. Every any is a potential runtime error waiting to happen. When you\'re tempted to use any, use unknown instead and add proper type guards.',
          'If you\'re dealing with external data (API responses, user input), create proper interfaces and validate at the boundary. Libraries like Zod make this easy and give you runtime validation too.',
        ],
      },
      {
        heading: 'Embrace Type Inference',
        paragraphs: [
          'You don\'t need to annotate everything. TypeScript\'s inference is excellent. Let it work for you. Explicit types on variables with obvious types just add noise.',
          'Do annotate function return types though. This catches bugs where your implementation doesn\'t match your intention.',
        ],
      },
      {
        heading: 'Use Discriminated Unions',
        paragraphs: [
          'Discriminated unions are one of TypeScript\'s killer features. Instead of optional properties that may or may not exist together, create explicit states with a type or status discriminator.',
          'This makes impossible states unrepresentable and lets TypeScript guide you to handle all cases.',
        ],
      },
      {
        heading: 'Import Types Separately',
        paragraphs: [
          'Use import type { X } for type-only imports. This makes it clear what\'s runtime vs. compile-time and can improve build performance and tree-shaking.',
          'Modern TypeScript with verbatimModuleSyntax enforces this, and it\'s a good practice regardless.',
        ],
      },
      {
        heading: 'Understand Structural Typing',
        paragraphs: [
          'TypeScript uses structural typing, not nominal typing. Two types with the same shape are compatible. This is powerful but can lead to bugs if you expect types to be distinct.',
          'Use branded types when you need true distinction between structurally identical types.',
        ],
      },
    ]),
    _status: 'published',
  },
  {
    title: 'The Art of Writing Good Commit Messages',
    slug: 'writing-good-commit-messages',
    summary:
      'Why commit message quality matters and how to write messages that your future self and teammates will thank you for.',
    publishedAt: '2024-09-10',
    content: createRichText([
      {
        paragraphs: [
          'Good commit messages are documentation. They explain not just what changed, but why. When you\'re debugging production issues at 2 AM, you\'ll be grateful for clear commit history.',
        ],
      },
      {
        heading: 'The Conventional Commits Format',
        paragraphs: [
          'Adopt a consistent format. Conventional Commits (feat:, fix:, refactor:, etc.) provides structure that makes history scannable and enables automated changelog generation.',
          'The format is simple: type(scope): subject. For example, feat(auth): add OAuth2 support or fix(cart): prevent negative quantities.',
        ],
      },
      {
        heading: 'Write Imperative Mood',
        paragraphs: [
          'Write "Add feature" not "Added feature" or "Adds feature". Think of it as completing the sentence: "If applied, this commit will [your subject line]."',
          'This keeps messages consistent and action-oriented.',
        ],
      },
      {
        heading: 'The Subject Line',
        paragraphs: [
          'Keep it under 50 characters. Be specific but concise. "Fix bug" tells you nothing; "Fix race condition in payment processing" tells the story.',
          'Don\'t end with a period. Capitalize the first letter. These small consistencies matter at scale.',
        ],
      },
      {
        heading: 'The Body',
        paragraphs: [
          'Not every commit needs a body, but complex changes do. Explain the motivation: what was the problem? What was the solution? Were there alternatives considered?',
          'Use bullet points for multiple changes. Reference issue numbers. Link to relevant documentation or discussions.',
        ],
      },
      {
        heading: 'Atomic Commits',
        paragraphs: [
          'Each commit should be a single logical change. Don\'t mix refactoring with bug fixes. Don\'t include unrelated changes because they happen to touch the same files.',
          'This makes code review easier, bisection more useful, and reverts safer.',
        ],
      },
    ]),
    _status: 'published',
  },
  {
    title: 'Draft: Exploring AI-Assisted Development',
    slug: 'ai-assisted-development',
    summary: 'My thoughts on integrating AI tools into the development workflow. Still working on this one.',
    publishedAt: '2024-12-10',
    content: createRichText([
      {
        paragraphs: [
          'This is a draft post about AI-assisted development tools and how they\'re changing the way I write code. Coming soon!',
        ],
      },
    ]),
    _status: 'draft',
  },
]

export function getBlogsData(
  mediaMap: MediaMap,
): Array<Omit<RequiredDataFromCollectionSlug<'blogs'>, 'content'> & { content: RichTextContent }> {
  return blogs.map(({ imageKey, ...blog }) => ({
    ...blog,
    image: imageKey ? mediaMap[imageKey] : undefined,
  }))
}

export async function seedBlogs(payload: Payload, mediaMap: MediaMap): Promise<void> {
  const blogsData = getBlogsData(mediaMap)

  for (const blog of blogsData) {
    await payload.create({
      collection: 'blogs',
      data: blog,
      context: {
        disableRevalidate: true,
      },
    })
    payload.logger.info(`Created blog: ${blog.title}`)
  }
}
