import { useParams } from 'react-router-dom'
import { ViewRouteParams } from '@/lib/routes'

export const ViewPage = () => {
  const { ideaId } = useParams<ViewRouteParams>()

  return <div>ViewPage {ideaId}</div>
}
