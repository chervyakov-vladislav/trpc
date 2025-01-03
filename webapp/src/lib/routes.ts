const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Readonly<
    Record<keyof T, string>
  >
}

export const getAllIdeasRoute = () => '/'
export const getViewIdeaRoute = ({ ideaId }: ViewRouteParams) => `/ideas/${ideaId}`

export const viewRouteParams = getRouteParams({ ideaId: true })
export type ViewRouteParams = typeof viewRouteParams
