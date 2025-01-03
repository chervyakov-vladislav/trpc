import { trpc } from '../../lib/trpc';

export const Home = () => {
  const { data, isLoading, isFetching, isError } = trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div>{
      data.ideas.map((idea, index) => (
        <div key={index}>
          <h2>{idea.nickname}</h2>
          <p>{idea.desciption}</p>
        </div>
      ))
    }</div>
  )
}
