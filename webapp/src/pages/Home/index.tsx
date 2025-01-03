import { trpc } from '@/lib/trpc'
import { Link } from 'react-router-dom'
import { getViewIdeaRoute } from '../../lib/routes'

export const Home = () => {
  const { data, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div>
      {data.ideas.map((idea, index) => (
        <div key={index}>
          <h2>
            <Link to={getViewIdeaRoute({ ideaId: idea.nickname })}>{idea.nickname}</Link>
          </h2>
          <p>{idea.desciption}</p>
        </div>
      ))}
    </div>
  )
}
