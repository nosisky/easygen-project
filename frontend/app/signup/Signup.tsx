import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../helpers';
import { useRouter } from 'next/router';

function SignUp() {
  const history = useRouter();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Minimum length of 8 characters')
      .matches(/[a-zA-Z]/, 'At least one letter')
      .matches(/\d/, 'At least one number')
      .matches(/[^a-zA-Z0-9]/, 'At least one special character'),
  });

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      try {
        await api.post('/auth/signup', values);
        history.push('/application');
      } catch (error) {
        console.error('Sign up error', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>Name:</label>
        <input
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && <div>{formik.errors.name}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && <div>{formik.errors.email}</div>}
      </div>
      <div>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && <div>{formik.errors.password}</div>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;