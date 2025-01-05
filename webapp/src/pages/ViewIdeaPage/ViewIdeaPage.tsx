import { useParams } from 'react-router-dom'
import { format } from 'date-fns/format'
import { ViewRouteParams } from '@/lib/routes'
import { trpc } from '@/lib/trpc'
import { Segment } from '@/components/Segment'
import css from './index.module.scss'

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
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={css.createdAt}>Created At: {format(data.idea.createdAt, 'yyyy-MM-dd')}</div>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </Segment>
  )
}
