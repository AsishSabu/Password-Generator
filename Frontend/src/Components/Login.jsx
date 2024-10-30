import { useFormik } from 'formik';
import * as Yup from 'yup';
import showToast from '../Utils/showToast';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { SERVER_URL } from '../Constants';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/store';
import { setUser } from '../Redux/userSlice';

const Login = () => {
  const navigate=useNavigate()
  const dispatch=useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      handleLoginSubmit(values);
    },
  });

  const handleLoginSubmit = async (values) => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/login`, values)
      console.log(data,"...........");
      
      const { access_token } = data;
      const { id, username } = jwtDecode(access_token);
      localStorage.setItem("access_token", access_token);
      dispatch(
        setUser({
          id,
          name:username,
          isAuthenticated: true,
        })
      );
      showToast(data.message);
      navigate("/");
    } catch (error) {
      console.log(error.response.data,"............");
      
      showToast(error.response.data.message, "error");
    }
  };


  return (
    <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    formik.touched.email && formik.errors.email ? 'ring-red-500' : ''
                  }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>

            </div>
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
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    formik.touched.password && formik.errors.password ? 'ring-red-500' : ''
                  }`}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Are you a new user?{' '}
          <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
