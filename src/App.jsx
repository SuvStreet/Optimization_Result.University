import { lazy } from 'react'
import { Route, Routes } from 'react-router'

import { MainLayout, PrivateRoute } from './components'
import { AuthProvider } from './context'

import './App.css'

const Home = lazy(() =>
  import('./pages/Home').then((module) => ({ default: module.Home }))
)

const Category = lazy(() =>
  import('./pages/Category').then((module) => ({ default: module.Category }))
)

const Detail = lazy(() =>
  import('./pages/Detail').then((module) => ({ default: module.Detail }))
)

const Signin = lazy(() =>
  import('./pages/Signin').then((module) => ({ default: module.Signin }))
)

const NotFound = lazy(() =>
  import('./pages/NotFound').then((module) => ({ default: module.NotFound }))
)

function App() {
  return (
    <div className="container">
      <div className="content">
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/:category"
                element={
                  <PrivateRoute>
                    <Category />
                  </PrivateRoute>
                }
              />
              <Route
                path="/:category/:id"
                element={
                  <PrivateRoute>
                    <Detail />
                  </PrivateRoute>
                }
              />
              <Route path="/signin" element={<Signin />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    </div>
  )
}

export default App
