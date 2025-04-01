import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { TextInput, Button } from '../components'
import { validateForm } from '../services'
import { useAuth } from '../context'

import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'

const inputs = [
  {
    required: true,
    label: 'Email',
    description: 'Ваш email',
    placeholder: 'email',
    iconCode: faAt,
    type: 'email',
    nameInput: 'email',
  },
  {
    required: true,
    label: 'Password',
    description: 'Ваш пароль',
    placeholder: 'пароль',
    iconCode: faKey,
    type: 'password',
    nameInput: 'password',
  },
]

export const Signin = () => {
  const [errors, setErrors] = useState({})
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const formRef = useRef(null)

  const handleChange = (event) => {
    const { name } = event.target

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(formRef.current)

    const formValues = Object.fromEntries(formData)

    const newErrors = validateForm(inputs, formValues)

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    auth.signin(formValues, () => {
      navigate(from, { replace: true })
    })

    formRef.current.reset()
  }

  return (
    <div>
      <h1>Авторизоваться</h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        onChange={handleChange}
        ref={formRef}
      >
        {inputs.map((input, index) => (
          <TextInput key={index} error={errors[input.nameInput]} {...input} />
        ))}
        <Button text="Авторизоваться" />
      </form>
    </div>
  )
}
