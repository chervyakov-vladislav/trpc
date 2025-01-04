import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './zCreateIdeaTrpcInput'

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  ideas.unshift(input)
  return true
})
