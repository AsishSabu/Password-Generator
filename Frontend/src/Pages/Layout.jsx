import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center">
      <div className="bg-gray-700 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
