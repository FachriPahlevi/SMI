import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Helmet } from 'react-helmet';
import { usePage } from '@inertiajs/react'

const UserLayout = ({ children }) => {
    const { auth } = usePage().props;
    return (
        <div className="flex flex-col sm:flex-row min-h-screen w-full">
            <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>

            {/* Sidebar Responsive */}
            <aside className="w-full sm:w-64 fixed sm:relative bg-gray-100 sm:bg-transparent">
                <Sidebar auth={auth} />
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 flex-col items-center sm:items-start min-h-screen justify-center sm:justify-start p-4 sm:p-8 mt-16 sm:mt-0">
                {children}
            </main>
        </div>
    );
};

export default UserLayout;
