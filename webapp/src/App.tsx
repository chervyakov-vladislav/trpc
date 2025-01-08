import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from '@/lib/trpc'
import { Home } from '@/pages/ideas/Home'
import { ViewIdeaPage } from '@/pages/ideas/ViewIdeaPage'
import * as routes from './lib/routes'
import { Layout } from '@/components/Layout'
import './styles/global.scss'
import { NewIdeaPage } from './pages/ideas/NewIdeaPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { EditIdeaPage } from './pages/ideas/EditIdeaPage'
import { AppContextProvider } from './lib/ctx'
import { NotFoundPage } from './pages/other/NotFoundPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getAllIdeasRoute()} element={<Home />} />
              <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
              <Route path={routes.getViewIdeaRoute(routes.viewRouteParams)} element={<ViewIdeaPage />} />
              <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
