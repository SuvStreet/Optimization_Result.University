import { Route, Routes } from 'react-router'

import { MainLayout, PrivateRoute } from './components'
import { Category, Detail, Home, NotFound, Signin } from './pages'
import { AuthProvider } from './context'

import './App.css'

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
