import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Captions, PieChart, MessageSquare, Settings, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();

  // State to toggle mobile sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-white shadow-md md:hidden">
        <div className="flex items-center justify-between px-6 py-3 h-16">
          <div className="text-lg font-semibold"> {/* Logo in the mobile header */}
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </div>
          {/* Menu Button to toggle sidebar */}
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Sidebar for Desktop & Tablet */}
      <aside
        className={`bg-white h-screen shadow-xl z-50 fixed md:relative top-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:w-64 w-64 flex flex-col`}
      >
        <div className="flex items-center justify-center h-24 border-b">
          <img src="/logo.svg" alt="Logo" className="h-12" />
        </div>

        <nav className="mt-6 flex-grow"> {/* Use flex-grow to push the nav items up */}
          <Link
            to="/"
            className={`flex items-center py-4 px-6 hover:bg-purple-100 ${
              isActive('/') ? 'text-gray-700 border-l-4 border-purple-600' : 'text-gray-600'
            }`}
          >
            <Home className="mr-3 h-5 w-5" />
            <span className="hidden lg:inline md:hidden">Dashboard</span> {/* Show text only on desktop */}
          </Link>
          <Link
            to="/blog"
            className="flex items-center py-4 px-6 hover:bg-purple-100 text-gray-600"
          >
            <Captions className="mr-3 h-5 w-5" />
            <span className="hidden lg:inline md:hidden">Blogs</span> {/* Show text only on desktop */}
          </Link>
          <a href="#" className="flex items-center py-4 px-6 hover:bg-purple-100 text-gray-600">
            <PieChart className="mr-3 h-5 w-5" />
            <span className="hidden lg:inline md:hidden">Finances</span> {/* Show text only on desktop */}
          </a>
          <a href="#" className="flex items-center py-4 px-6 hover:bg-purple-100 text-gray-600">
            <MessageSquare className="mr-3 h-5 w-5" />
            <span className="hidden lg:inline md:hidden">Pitches</span> {/* Show text only on desktop */}
          </a>
        </nav>

        {/* Bottom section stays fixed at the bottom */}
        {isAuthenticated && (
          <div className="mt-auto">
            <a href="#" className="flex items-center py-4 px-6 hover:bg-purple-100 text-gray-600">
              <Settings className="mr-3 h-5 w-5" />
              <span className="hidden lg:inline md:hidden">Settings</span> {/* Show text only on desktop */}
            </a>

            <div
              onClick={logout}
              className="cursor-pointer flex items-center py-4 px-6 hover:bg-purple-100 text-gray-600"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span className="hidden lg:inline md:hidden">Logout</span> {/* Show text only on desktop */}
            </div>
          </div>
        )}
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
