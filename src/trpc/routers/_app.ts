import { z } from 'zod'

import { baseProcedure, createTRPCRouter } from '../init'
import { experiencesRouter } from './experiences'
import { profileRouter } from './profile'
import { projectsRouter } from './projects'
import { skillsRouter } from './skills'

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return { greeting: `hello ${input.text}` }
    }),
  projects: projectsRouter,
  experiences: experiencesRouter,
  skills: skillsRouter,
  profile: profileRouter,
})

export type AppRouter = typeof appRouter
