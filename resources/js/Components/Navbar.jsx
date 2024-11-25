import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FaBell } from "react-icons/fa";


export default function Navbar({ auth }) {
  const { post } = useForm();
  const [isOpen, setIsOpen] = useState(false); // State untuk dropdown

  const handleLogout = () => {
    post(route('logout'));
  };

  return (
    <nav className="bg-white shadow-md z-999">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <img src="/img/logo/logo_smi.png" alt="SMI Logo" className="h-8" />
          </Link>

          <div className="flex items-center">
            <div className="hidden md:flex space-x-8 mr-5">
              <Link href="/" className="text-gray-700 hover:text-blue-900">
                Home
              </Link>
              {/* Dropdown Divisi */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-900">Divisi</button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 z-50">
                  <ul className="py-2">
                    <li>
                      <Link 
                        href="/divisi/marketing" 
                        className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-900"
                      >
                        Marketing
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/divisi/finance" 
                        className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-900"
                      >
                        Finance
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/divisi/it" 
                        className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-900"
                      >
                        IT
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <Link href="/panduan" className="text-gray-700 hover:text-blue-900">Panduan</Link>
            </div>
            <FaBell className='text-black h-5 w-5 mr-5' />
            {/* Dropdown Profil */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
              >
                <span className="text-gray-700">{auth.user.name}</span>
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && ( // Dropdown muncul jika isOpen true
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-900"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-900"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
