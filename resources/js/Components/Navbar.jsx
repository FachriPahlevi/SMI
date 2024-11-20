import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar(){
    return(
        <nav className="bg-white shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img src="/img/logo/logo_smi.png" alt="SMI Logo" className="h-8" />
            </Link>

            <div className="flex items-center">
            <div className="hidden md:flex space-x-8 mr-5">
              <Link href="/" className="text-gray-700 hover:text-blue-900">Home</Link>
              
              {/* Dropdown Divisi */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-900">Divisi</button>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2">
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

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search text"
                  className="w-full bg-gray-100 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              <Link href="/profile" className="ml-4">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
}