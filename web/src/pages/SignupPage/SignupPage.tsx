import { useEffect, useRef } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
  DateField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

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
      toast.success('Account created successfully!')
      navigate(routes.login())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // Focus on email field on page load
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string | null>) => {
    try {
      await createUser({
        variables: {
          input: {
            email: data.email,
            password: data.password,
            resetToken: data.resetToken || null,
            resetTokenExpiresAt: data.resetTokenExpiresAt || null,
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Metadata title="Signup" />
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>
            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="email"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
                  </Label>
                  <TextField
                    name="email"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
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
                  <FieldError name="email" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="new-password"
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
                  <FieldError name="password" className="rw-field-error" />

                  <Label
                    name="resetToken"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Reset Token (optional)
                  </Label>
                  <TextField
                    name="resetToken"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                  />
                  <FieldError name="resetToken" className="rw-field-error" />

                  <Label
                    name="resetTokenExpiresAt"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Reset Token Expires At (optional)
                  </Label>
                  <DateField
                    name="resetTokenExpiresAt"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                  />
                  <FieldError
                    name="resetTokenExpiresAt"
                    className="rw-field-error"
                  />

                  <div className="rw-button-group">
                    <Submit
                      className="rw-button rw-button-blue"
                      disabled={loading}
                    >
                      {loading ? 'Signing up...' : 'Sign Up'}
                    </Submit>
                  </div>
                </Form>
                {error && <div className="rw-form-error">{error.message}</div>}
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
