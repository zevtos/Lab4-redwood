import { useEffect, useRef, useState} from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { GraduationCap } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <GraduationCap className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Student Authentication
        </h2>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Student: Ivan Ivanov</p>
          <p>Group: P3234</p>
          <p>Variant: 12345</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <Form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <Label name="username" className="block text-sm font-medium text-gray-700">
                Username
              </Label>
              <div className="mt-1">
                <TextField
                  name="username"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ref={usernameRef}
                  validation={{
                    required: true,
                  }}
                />
              </div>
            </div>

            <div>
              <Label name="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="mt-1">
                <PasswordField
                  name="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  validation={{
                    required: true,
                  }}
                />
              </div>
            </div>

            <div>
              <Submit className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </Submit>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage