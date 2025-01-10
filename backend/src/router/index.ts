import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
import { getIdeaTrpcRoute } from './ideas/getIdea'
import { getIdeasTrpcRoute } from './ideas/getIdeas'
import { createIdeaTrpcRoute } from './ideas/createIdea'
import { setIdeaLikeTrpcRoute } from './ideas/setIdeaLike'
import { blockIdeaTrpcRoute } from './ideas/blockIdea'
import { updateIdeaTrpcRoute } from './ideas/updateIdea'
import { signUpTrpcRoute } from './auth/signUp'
import { signInTrpcRoute } from './auth/signIn'
import { getMeTrpcRoute } from './auth/getMe'
import { updateProfileTrpcRoute } from './auth/updateProfile'
import { updatePasswordTrpcRoute } from './auth/updatePassword'

export const trpcRouter = trpc.router({
  getMe: getMeTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
  updateProfile: updateProfileTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  setIdeaLike: setIdeaLikeTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  blockIdea: blockIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
