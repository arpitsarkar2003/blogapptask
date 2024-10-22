import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'

// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../ui/Button'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Blogs</h1>
          </div>
          <div className="flex items-center">
            <div className="relative hidden md:block mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100"
              />
            </div>
            {user ? (
              <div className="flex items-center">
                {/* <Avatar className="mr-2">
                  <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar> */}
                img
                <span className="text-gray-700 mr-4">{user.name}</span>
                <Button onClick={logout} variant="ghost">Logout</Button>
              </div>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}