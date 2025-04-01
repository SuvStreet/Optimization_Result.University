import { Icon } from '../Icon/Icon'

import './TextInput.css'

export const TextInput = (dependencies) => {
  const {
    variant = 'default',
    required,
    label,
    description,
    placeholder,
    error,
    iconCode,
    size = 'sm',
    radius = 'sm',
    type = 'text',
    nameInput = 'input',
    options = [],
    ...props
  } = dependencies

  const hiddenError = () => {
    if (error) {
      return 'error'
    } else {
      return ''
    }
  }

  const renderRadioOptions = () => (
    <div className={`radio-group ${hiddenError()}`}>
      {options.map((option, index) => (
        <div key={index} className="radio-label">
          <input
            id={option.value}
            type="radio"
            name={nameInput}
            defaultChecked={option.defaultChecked}
            value={option.value}
            required={required}
            {...props}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  )

  const renderTextInput = () => (
    <div
      data-variant={variant}
      className={`wrapper ${hiddenError()} radius-${radius}`}
    >
      {iconCode && (
        <div className={`icon ${hiddenError()}`}>
          <Icon iconCode={iconCode} />
        </div>
      )}
      <input
        type={type}
        name={nameInput}
        className={`input ${hiddenError()}`}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  )

  return (
    <div className="root_container" data-size={size}>
      <label className="label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <small className="description">{description}</small>

      {type === 'radio' ? renderRadioOptions() : renderTextInput()}

      {error && <div className="error errorMessage">{error}</div>}
    </div>
  )
}
