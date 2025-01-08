import { z } from 'zod'
import { zCreateIdeaTrpcInput } from '../createIdea/zCreateIdeaTrpcInput'

export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput.extend({
  ideaId: z.string().min(1),
})
