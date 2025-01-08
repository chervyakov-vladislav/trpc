import { trpc } from '@/lib/trpc'
import { Link } from 'react-router-dom'
import { getViewIdeaRoute } from '@/lib/routes'
import { Segment } from '@/components/Segment'
import css from './index.module.scss'

export const Home = () => {
  const { data, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <Segment title="All Ideas">
      <div className={css.ideas}>
        {data.ideas.map((idea) => (
          <div className={css.idea} key={idea.nick}>
            <Segment
              size={2}
              title={
                <Link className={css.ideaLink} to={getViewIdeaRoute({ ideaId: idea.nick ?? '' })}>
                  {idea.name}
                </Link>
              }
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
