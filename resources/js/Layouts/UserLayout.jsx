import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { Helmet } from 'react-helmet';
import { usePage } from '@inertiajs/react';

const UserLayout = ({ children }) => {
  const { auth } = usePage().props;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      {/* Navbar */}
      <header className="w-full bg-gray-100 shadow-md fixed top-0 z-10">
        <Navbar auth={auth} />
      </header>

      {/* Layout Wrapper */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <aside className="hidden sm:block w-64 bg-gray-100 border-r min-h-screen">
          <Sidebar auth={auth} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
