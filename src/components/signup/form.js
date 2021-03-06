import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button } from '@material-ui/core'

import { required, email, minLength10 } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'

function SignupForm(props) {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit} >
      <div className='blockCard'>
        <div className='blockBody'>
          <h1>Signup</h1>
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

          <Button type='submit' color='primary' variant='contained'>
            Signup
          </Button>
        </div>
      </div>
    </form>
  )
}

let signupForm = reduxForm({
  form: 'signup'
})(SignupForm)

export default signupForm
