const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateForm = (inputs, formValues) => {
  let errors = {}

  inputs.forEach(({ nameInput, required }) => {
    const value = formValues[nameInput]

    if (required && !value) {
      errors[nameInput] = 'Поле не может быть пустым'
    } else if (nameInput === 'email' && !isValidEmail(value)) {
      errors[nameInput] = 'Некорректный email'
    } else if (nameInput === 'passwordConfirm') {
      if (value !== formValues.password) {
        errors[nameInput] = 'Пароли не совпадают'
      }
    }
  })

  return errors
}
