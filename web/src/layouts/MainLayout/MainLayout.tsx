import { useLocation, navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Header from 'src/components/Header/Header'

const MainLayout = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  // Redirect to signup if not authenticated and trying to access home
  if (location.pathname === '/' && !isAuthenticated) {
    navigate(routes.signup())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default MainLayout
