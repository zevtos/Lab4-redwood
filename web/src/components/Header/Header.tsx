import { Link, routes, navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Logo from 'src/components/Logo/Logo'
import StudentInfo from 'src/components/StudentInfo/StudentInfo'
const Header = () => {
  const { isAuthenticated, logOut } = useAuth()

  const handleLogout = async () => {
    await logOut()
    navigate(routes.login())
  }

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8">
          <Link to={routes.home()} className="flex items-center space-x-3">
            <Logo />
            <span className="text-xl font-semibold text-gray-900">
              Point Checker
            </span>
          </Link>
          <StudentInfo className="hidden md:block" />
        </div>
        <nav className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to={routes.signup()}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Sign Up
              </Link>
              <Link
                to={routes.login()}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Log In
              </Link>
            </>
          ) : (
            <>
              <Link
                to={routes.home()}
                className="hidden rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 sm:block"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
      <div className="border-t bg-gray-50 px-4 py-2 md:hidden">
        <StudentInfo />
      </div>
    </header>
  )
}

export default Header
