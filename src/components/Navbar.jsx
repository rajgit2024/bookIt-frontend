import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity duration-200">
          BookIt
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm font-medium opacity-90">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>

              <button
                onClick={logout}
                className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:opacity-80 transition-opacity duration-200 px-3 py-2"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
