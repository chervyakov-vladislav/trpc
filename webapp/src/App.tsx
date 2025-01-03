import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from '@/lib/trpc'
import { Home } from '@/pages/Home'
import { ViewPage } from '@/pages/ViewIdeaPage'
import * as routes from './lib/routes'
import { Layout } from '@/components/Layout'
import './styles/global.scss'
import { NewIdeaPage } from './pages/NewIdeaPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<Home />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
            <Route path={routes.getViewIdeaRoute(routes.viewRouteParams)} element={<ViewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
