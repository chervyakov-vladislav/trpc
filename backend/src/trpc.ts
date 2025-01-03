import { initTRPC } from '@trpc/server'
import { pick, times } from 'lodash'
import { z } from 'zod'

const ideas = times(100, (index) => ({
  name: `idea ${index}`,
  nickname: `cool-name ${index}`,
  desciption: `desc ${index}`,
  text: times(50, (j) => `<p>Text paragraph ${j} of idea ${index}</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas: ideas.map((idea) => pick(idea, ['nickname', 'name', 'desciption'])),
    }
  }),
  getIdea: trpc.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.nickname === input.ideaNick)

      return { idea: idea || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
