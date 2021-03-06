export const required = value => (value || typeof value === 'number' ? undefined : 'Required')

export const requiredInputSelect = value => (value && (value.type && (value.value || typeof value.value === 'number')) ? undefined : 'Required')

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength10 = minLength(10)

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

export const phone = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined
