import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from '@/lib/trpc'
import { Home } from '@/pages/Home'
import { ViewPage } from '@/pages/ViewIdeaPage'
import { getAllIdeasRoute, getViewIdeaRoute, viewRouteParams } from '@/lib/routes'
import { Layout } from '@/components/Layout'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllIdeasRoute()} element={<Home />} />
            <Route path={getViewIdeaRoute(viewRouteParams)} element={<ViewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
