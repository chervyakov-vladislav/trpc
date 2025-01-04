import { times } from 'lodash'

export const ideas = times(100, (index) => ({
  name: `idea ${index}`,
  nickname: `cool-name ${index}`,
  description: `desc ${index}`,
  text: times(50, (j) => `<p>Text paragraph ${j} of idea ${index}</p>`).join(''),
}))
