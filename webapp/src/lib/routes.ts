const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Readonly<
    Record<keyof T, string>
  >
}

export const getAllIdeasRoute = () => '/'
export const getViewIdeaRoute = ({ ideaId }: ViewIdeaRouteParams) => `/ideas/${ideaId}`

export const viewRouteParams = getRouteParams({ ideaId: true })
export type ViewIdeaRouteParams = typeof viewRouteParams

export const editIdeaRouteParams = getRouteParams({ ideaId: true })
export type EditIdeaRouteParams = typeof viewRouteParams
export const getEditIdeaRoute = ({ ideaId }: EditIdeaRouteParams) => `/ideas/${ideaId}/edit`

export const getNewIdeaRoute = () => '/ideas/new'
export const getEditProfileRoute = () => '/edit-profile'
export const getSignUpRoute = () => '/sign-up'
export const getSignInRoute = () => '/sign-in'
export const getSignOutRoute = () => '/sign-out'
