import { NavLink, Outlet, useNavigate } from 'react-router'

import { useAuth } from '../../context'
import { Button } from '../Button/Button'

import s from './style.module.css'

export function MainLayout() {
  const auth = useAuth()
  const navigate = useNavigate()

  const signout = () => {
    auth.signout(() => {
      navigate('/', { replace: true })
    })
  }

  return (
    <>
      <nav className={s.nav}>
        <ul className={s.menu}>
          <li>
            <NavLink to="/">Главная</NavLink>
          </li>
          <li>
            <NavLink to="/characters">Персонажи</NavLink>
          </li>
          <li>
            <NavLink to="/location">Локации</NavLink>
          </li>
          <li>
            <NavLink to="/episode">Эпизоды</NavLink>
          </li>
        </ul>

        <div className={s.user}>
          {auth.user === null ? (
            'Незнакомец'
          ) : (
            <>
              Привет,<span className={s.name}> {auth.user}</span>/
              <Button className={s.btnSignout} onClick={signout} text="Выход" />
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  )
}
