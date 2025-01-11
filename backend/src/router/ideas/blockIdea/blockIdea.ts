import { trpc } from '../../../lib/trpc'
import { sendIdeaBlockedEmail } from '../../../lib/emails'
import { canBlockIdeas } from '../../../utils/can'
import { zBlockIdeaTrpcInput } from './zBlockIdeaTrpcInput'

export const blockIdeaTrpcRoute = trpc.procedure.input(zBlockIdeaTrpcInput).mutation(async ({ ctx, input }) => {
  const { ideaId } = input
  if (!canBlockIdeas(ctx.me)) {
    throw new Error('PERMISSION_DENIED')
  }
  const idea = await ctx.prisma.idea.findUnique({
    where: {
      id: ideaId,
    },
    include: {
      author: true,
    },
  })
  if (!idea) {
    throw new Error('NOT_FOUND')
  }
  await ctx.prisma.idea.update({
    where: {
      id: ideaId,
    },
    data: {
      blockedAt: new Date(),
    },
  })

  sendIdeaBlockedEmail({ user: idea.author, idea })
  return true
})
