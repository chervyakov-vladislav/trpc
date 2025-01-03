import { useParams } from 'react-router-dom'
import { ViewRouteParams } from '@/lib/routes'
import { trpc } from '@/lib/trpc'

export const ViewPage = () => {
  const { ideaId = '' } = useParams<ViewRouteParams>()
  const { data, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ ideaNick: ideaId })

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  if (!data.idea) {
    return <div>Not found</div>
  }

  return (
    <div>
      <div>{data.idea.name}</div>
      <div>{data.idea.nickname}</div>
      <div>{data.idea.desciption}</div>
      <div dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </div>
  )
}
