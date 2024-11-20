// resources/js/Layouts/MainLayout.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import { Helmet } from 'react-helmet';
import { usePage } from '@inertiajs/react'

const MainLayout = ({ children }) => {
  const { auth } = usePage().props;
  return (
    <div className="min-h-screen flex flex-col">
        <Helmet>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Helmet>

        {/* Sidebar Responsive */}
        <aside className="w-full bg-gray-100">
            <Navbar auth={auth} />
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>
    </div>
  );
};

export default MainLayout;