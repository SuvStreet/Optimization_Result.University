import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('email')))

  const signin = (newUser, callback) => {
    setUser(newUser.email)
    localStorage.setItem('email', JSON.stringify(newUser.email))
    callback()
  }

  const signout = (callback) => {
    setUser(null)
    localStorage.removeItem('email')
    callback()
  }

  const value = {
    user,
    signin,
    signout,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
