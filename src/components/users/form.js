import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { formValueSelector } from 'redux-form'

import { required, requiredInputSelect, email, phone } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import renderInputSelectField from './../../formHelpers/renderInputSelectField'
import RepeatedFields from './../../formHelpers/repeatedFields'
import EmergencyContactFields from './emergencyContactFields'

function UserForm(props) {
  const { handleSubmit, occupation, submitting, submitError, readonly, title, submitText } = props
  console.log(props.initialValues)

  return (
    <form onSubmit={handleSubmit}>
      <div className="blockCard">
        <div className='blockHeader'>
          { title }
        </div>
        <div className="blockBody">
          <Field
            name='name'
            label='Name'
            component={renderField}
            validate={[required]}
            readonly={readonly}
            type='text' />

          <Field
            name='email'
            label='Email'
            component={renderField}
            validate={[required, email]}
            readonly={readonly}
            type='text' />

          <Field
            name='phone'
            label='Phone'
            component={renderField}
            validate={[required, phone]}
            readonly={readonly}
            type='text' />

          <Field
            name='data.gender'
            component={renderSelectField}
            label='Gender'
            readonly={readonly}
            options={[
              ['male', 'Male'],
              ['female', 'Female'],
            ]} />

          <Field
            name='data.marriageStatus'
            component={renderSelectField}
            label='Marriage status'
            readonly={readonly}
            options={[
              ['notMarried', 'Not Married'],
              ['married', 'Married'],
            ]} />

          <Field
            name='data.religion'
            component={renderSelectField}
            label='Religion'
            readonly={readonly}
            options={[
              ['muslim', 'Muslim'],
              ['christianProtestant', 'Christian Protestant'],
              ['christianCatholic', 'Christian Catholic'],
              ['hindu', 'Hindu'],
              ['buddhist', 'Buddhist'],
              ['confucian', 'Confucian'],
              ['other', 'Other'],
            ]} />

          <Field
            name='data.identification'
            label='Identification'
            component={renderInputSelectField}
            readonly={readonly}
            inputType='text'
            validate={[requiredInputSelect]}
            options={[
              ['KTP ID/NIK', 'KTP ID/NIK'],
              ['KITAS ID', 'KITAS ID'],
              ['Passport Number', 'Passport Number'],
            ]} />

          <Field
            name='data.occupation'
            component={renderSelectField}
            label='Occupation'
            readonly={readonly}
            options={[
              ['student', 'Student'],
              ['professional', 'Professional'],
              ['unemployed', 'Unemployed'],
            ]} />

          {
            occupation === 'professional' &&
            <div>
              <h4>Company information</h4>
              <Field
                name='data.companyName'
                label='Company Name'
                component={renderField}
                readonly={readonly}
                type='text' />

              <Field
                name='data.companyAddress'
                label='Company Address'
                component={renderField}
                readonly={readonly}
                type='text' />

              <Field
                name='data.companyPhone'
                label='Company Phone'
                component={renderField}
                readonly={readonly}
                validate={[phone]}
                type='text' />
            </div>
          }

          {
            !readonly &&
            <button type='submit' disabled={submitting}>
              { submitText }
            </button>
          }

          <div className='errorResponse'>
            { submitError && JSON.stringify(submitError) }
          </div>
        </div>
      </div>

      <div className='blockCard'>
        <div className='blockHeader'>
          Emergency contact
        </div>
        <div className='blockBody'>
          <FieldArray
            name='data.emergencyContacts'
            buttonText='Add emergency contact'
            entityText='Emergency contact'
            readonly={readonly}
            childComponent={EmergencyContactFields}
            component={RepeatedFields} />
        </div>
      </div>
    </form>
  )
}

let userForm = reduxForm({
  form: 'user'
})(UserForm)

const selector = formValueSelector('user')
userForm = connect(state => ({
  occupation: selector(state, 'data.occupation'),
}))(userForm)

export default userForm
