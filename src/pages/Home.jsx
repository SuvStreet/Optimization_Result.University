import { Link } from 'react-router'

import { useAuth } from '../context'

export function Home() {
  const auth = useAuth()

  return (
    <>
      <h1>
        Добро пожаловать
        <span style={{ color: '#65e665' }}>
          {' '}
          {auth.user !== null && auth.user}
        </span>{' '}
        на страничку о вселенной Рика и Морти!
      </h1>
      {auth.user === null && (
        <p>
          Давай познакомимся, <Link to="/signin">войди</Link> в аккаунт.
        </p>
      )}
    </>
  )
}
