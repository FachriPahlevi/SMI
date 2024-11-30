import React, { useState, useEffect } from 'react';
import { FaUser, FaFileAlt, FaTimes, FaBars } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

export default function Sidebar({ auth }) {
  const [selectedKey, setSelectedKey] = useState(window.location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setSelectedKey(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    ...(auth.user.role === 'superadmin' 
      ? [{
          icon: <FaUser className="mr-3 w-5 h-5" />,
          label: 'Manajemen User',
          path: '/manajemen-user'
        }] 
      : []
    ),
    {
      icon: <FaFileAlt className="mr-3 w-5 h-5" />,
      label: 'Daftar SOP',
      path: '/daftar-divisi'
    }
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded-full shadow-lg"
      >
        {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:relative top-0 left-0 h-full w-64 bg-gray-800 text-white 
        transform transition-transform duration-300 z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 shadow-lg
      `}>
        {/* Close Button for Mobile */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden absolute top-4 right-4 text-white"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Sidebar Header */}
        <div className="sidebar-header text-center py-6 border-b border-gray-700">
          <h2 className="text-xl font-bold uppercase">{auth.user.role}</h2>
        </div>

        {/* Menu Items */}
        <ul className="mt-4">
          {menuItems.map((item) => (
            <li 
              key={item.path}
              className={`
                px-6 py-3 flex items-center cursor-pointer transition 
                ${selectedKey === item.path ? 'bg-gray-700' : 'hover:bg-gray-700'}
              `}
              onClick={() => window.location.href = item.path}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}