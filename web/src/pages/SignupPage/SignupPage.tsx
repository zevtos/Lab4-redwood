import { useRef } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import Header from 'src/components/Header/Header'
const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
    }
  }
`

const SignupPage = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Account created successfully! Please log in.')
      navigate(routes.login())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const emailRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (data: Record<string, string>) => {
    const { email, password, passwordConfirmation } = data

    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match')
      return
    }

    try {
      await createUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <MetaTags title="Sign Up" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Header />
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-lg bg-white px-4 py-8 shadow-xl sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>

          <Form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div>
              <Label
                name="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="mt-1">
                <TextField
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  ref={emailRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  }}
                />
                <FieldError
                  name="email"
                  className="mt-1 text-sm text-red-600"
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
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  }}
                />
                <FieldError
                  name="password"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
            </div>

            <div>
              <Label
                name="passwordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              <div className="mt-1">
                <PasswordField
                  name="passwordConfirmation"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password confirmation is required',
                    },
                  }}
                />
                <FieldError
                  name="passwordConfirmation"
                  className="mt-1 text-sm text-red-600"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error.message}</div>
              </div>
            )}

            <div>
              <Submit
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </Submit>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link
                to={routes.login()}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignupPage
