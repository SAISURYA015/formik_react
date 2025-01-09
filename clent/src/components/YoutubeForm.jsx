import React, { useState } from 'react'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField
} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const savedValues = {
  name: '',
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const onSubmit = (values, onSubmitProps) => {
  console.log('Form data', values)
  console.log('Submit props', onSubmitProps)
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
}

const validate = values => {
  // values.name values.email values.channel
  // errors.name errors.email errors.channel
  // errors.name = 'This field is Required'

  let errors = {}

  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email Format'
  }

  if (!values.channel) {
    errors.channel = 'Required'
  }

  return errors
}

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email Format').required('Required'),
  channel: Yup.string().required('Required'),
  comments: Yup.string().required('Required'),
})

const validateComments = value => {
  let error
  if (!value) {
    error = "Required"
  }
  return error
}

function YoutubeForm() {
  const [formValues, setFormValues] = useState(null);
  // console.log('Form Values', formik.values)
  // console.log('Form Data', formik.errors)
  // console.log('Visted fields', formik.touched)

  return (
    <Formik
      // initialValues={initialValues}
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    // validateOnMount
    >
      {
        formik => {
          console.log('Formik Props', formik);

          return (
            <Form>
              <div className='form-control'>
                <label htmlFor='name'>Name</label>
                <Field
                  type='text'
                  id='name'
                  name='name'
                />
                <ErrorMessage name='name' component={TextError} />
              </div>
              {/* email */}
              <div className='form-control'>
                <label htmlFor='email'>Email</label>
                <Field
                  type='email'
                  id='email' Field
                  name='email'
                />
                <ErrorMessage name='email'>
                  {
                    errorMsg => <div className='error'>{errorMsg}</div>
                  }
                </ErrorMessage>
              </div>
              {/* channel */}
              <div className='form-control'>
                <label htmlFor='channel'>Channel</label>
                <Field
                  type='text'
                  d='channel'
                  name='channel'
                  placeholder='Channel Name'
                />
                <ErrorMessage name='channel' />
              </div>
              {/* comments */}
              <div className='form-control'>
                <label htmlFor="comments">Comments</label>
                <Field as='textarea' id='comments' name='comments' validate={validateComments} />
                <ErrorMessage name='comments' component={TextError} />
              </div>
              <div className='form-control'>
                <label htmlFor='address'>Address</label>
                <FastField name='address'>
                  {
                    (add) => {
                      const { field, form, meta } = add
                      // console.log('Render props', add)
                      return (
                        <div>
                          <input type='text' id='address' {...field} />
                          {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                        </div>
                      )
                    }
                  }
                </FastField>
              </div>
              {/* facebook */}
              <div className='form-control'>
                <label htmlFor="facebook">Facebook Profile</label>
                <Field type="text" id="facebook" name="social.facebbok" />
              </div>
              {/* twitter */}
              <div className='form-control'>
                <label htmlFor="twitter">Twitter Profile</label>
                <Field type="text" id="twitter" name="social.twitter" />
              </div>
              {/* phonenumber */}
              <div className='form-control'>
                <label htmlFor="primaryPh">Primary Phone Number</label>
                <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
              </div>
              <div className='form-control'>
                <label htmlFor="secondryPh">Secondry Phone Number</label>
                <Field type="text" id="secondryPh" name="phoneNumbers[1]" />
              </div>
              {/* list of pnone numbers */}
              <div className='form-control'>
                <label htmlFor="List of Phone Numbers"></label>
                <FieldArray name='phNumbers'>
                  {
                    (fieldArrayProps) => {
                      // console.log('fieldArrayProps', fieldArrayProps)
                      const { push, remove, form } = fieldArrayProps
                      const { values } = form
                      const { phNumbers } = values
                      // console.log('Form errors', form.errors)
                      return (
                        <>
                          {phNumbers.map((phNumbers, index) => (
                            <div key={index}>
                              <Field name={`phNumbers[${index}]`} />
                              {
                                index > 0 && <button type='button' onClick={() => remove(index)}>{' '}- {' '}</button>
                              }

                              <button type='button' onClick={() => push('')}>{' '}+{' '}</button>
                            </div>
                          ))}
                        </>
                      )
                    }
                  }
                </FieldArray>
              </div>
              {/* <button type='button' onClick={() => formik.validateField('comments')}>Validate comments</button>
              <button type='button' onClick={() => formik.validateForm()}>Validate all</button>
              <button type='button' onClick={() => formik.setFieldTouched('comments')}>Visit comments</button>
              <button type='button' onClick={() => formik.setTouched({
                name: true,
                email: true,
                channel: true,
                comments: true
              })}>Visit Fields</button> */}
              <button type='button' onClick={() => setFormValues(savedValues)}>Load Saved Data</button>
              <button type='reset'>Reset</button>
              <button style={{ marginTop: '10px' }} disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
            </Form>
          )
        }
      }

    </Formik>
  )
}

export default YoutubeForm





// simple form with three fields
// useFormik hhoks
// managing from state, handling form submission and form validation
// initalvalues object + formik.handleChange
// onSubmit method + formik.handleSubmit
// validate function
// validationSchema object
// formik.errors and formik.touched
// formik components - Formik, Form, Field and ErroeMessage

