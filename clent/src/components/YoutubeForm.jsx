import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: 'Surya',
  email: '',
  channel: ''
}

const onSubmit = values => {
  console.log('Form data', values)
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
  channel: Yup.string().required('Required')
})

function YoutubeForm() {

  // console.log('Form Values', formik.values)
  // console.log('Form Data', formik.errors)
  // console.log('Visted fields', formik.touched)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <Field
            type='text'
            id='name'
            name='name'
          />
          <ErrorMessage name='name' />
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <Field
            type='email'
            id='email' Field
            name='email'
          />
          <ErrorMessage name='email' />
        </div>
        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <Field
            type='text'
            d='channel'
            name='channel'
          />
          <ErrorMessage name='channel' />
        </div>
        <button style={{ marginTop: '10px' }}>Submit</button>
      </Form>
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

