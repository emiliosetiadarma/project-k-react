import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { required, email, minLength10 } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'

function LoginForm(props) {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit} >
      <h1>Login</h1>
      <Field
        name='email'
        label='Email'
        component={renderField}
        validate={[required, email]}
        type='text' />

      <Field
        name='password'
        label='Password'
        component={renderField}
        validate={[required, minLength10]}
        type='password' />

      <button type='submit'>
        Login
      </button>
    </form>
  )
}

let loginForm = reduxForm({
  form: 'login'
})(LoginForm)

export default loginForm
