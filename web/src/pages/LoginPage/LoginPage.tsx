import { useRef, useState } from 'react'

import { Form, Label, TextField, PasswordField, Submit } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import Header from 'src/components/Header/Header'
import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { logIn } = useAuth()
  const [error, setError] = useState(null)
  const usernameRef = useRef<HTMLInputElement>()

  const onSubmit = async (data) => {
    try {
      const response = await logIn({ ...data })
      if (response.error) {
        setError(response.error)
      } else {
        navigate(routes.home())
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <MetaTags title="Login" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Header />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg bg-white px-4 py-8 shadow-xl sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <Form onSubmit={onSubmit} className="mt-8 space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <Label
                name="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <div className="mt-1">
                <TextField
                  name="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  ref={usernameRef}
                  validation={{
                    required: true,
                  }}
                />
              </div>
            </div>

            <div>
              <Label
                name="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="mt-1">
                <PasswordField
                  name="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  validation={{
                    required: true,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to={routes.forgotPassword()}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Submit className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Sign in
              </Submit>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link
                to={routes.signup()}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
