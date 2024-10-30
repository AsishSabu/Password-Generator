import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { SERVER_URL } from '../Constants';
import showToast from '../Utils/showToast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required')
        .matches(/^(?!\s)(?!.*\s$)/, 'Password cannot contain spaces')
        .matches(/(?=.*[0-9])/, 'Password must contain at least one number') 
        .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/(?=.*[!@#$%^&*])/, 'Password must contain at least one special character'),
    }),
    onSubmit: async (values) => {
      handleRegisterSubmit(values);
    },
  });

  const handleRegisterSubmit = async (values) => {
    try {
      const response = await axios.post(`${SERVER_URL}/register`, values);
      console.log('response', response);
      if (response.status === 200) {
        showToast('Registered Successfully. Login Now', 'success');
        navigate('/login');
      }
    } catch (error) {
      showToast('Registration failed',error);
    }
  };

  return (
    <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.touched.name && formik.errors.name ? 'ring-red-600' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.touched.email && formik.errors.email ? 'ring-red-600' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${formik.touched.password && formik.errors.password ? 'ring-red-600' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link to="/login"  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
