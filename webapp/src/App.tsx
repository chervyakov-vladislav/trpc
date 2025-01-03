import { TrpcProvider } from './lib/trpc'
import { Home } from './pages/Home'

export const App = () => {
  return (
    <TrpcProvider>
      <Home />
    </TrpcProvider>
  )
}
