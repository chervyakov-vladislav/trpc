import { initTRPC } from '@trpc/server'

const ideas = [
  { nickname: 'cool-name', name: 'idea 1', desciption: 'desc' },
  { nickname: 'cool-name', name: 'idea 2', desciption: 'desc' },
  { nickname: 'cool-name', name: 'idea 3', desciption: 'desc' },
  { nickname: 'cool-name', name: 'idea 4', desciption: 'desc' },
  { nickname: 'cool-name', name: 'idea 5', desciption: 'desc' },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return {
      ideas,
    }
  }),
})

export type TrpcRouter = typeof trpcRouter
