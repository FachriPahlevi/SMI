import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import axios from 'axios';

export default function Navbar({ auth }) {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    axios.get('/notifications')
    .then((response) => {
      if (response.data.success && response.data.data) {
        setNotifications(response.data.data);
      }
    })
    .catch((error) => {
      console.error('Error fetching notifications:', error);
    });
  }, []);

  const handleLogout = () => {
    post(route('logout'), {
      onSuccess: () => {
        window.location.href = '/login';
      },
    });
  };

  const handleNotificationClick = (id) => {
    // Implement notification click logic
    const notification = notifications.find((notif) => notif.id === id);
    if (notification && notification.id_sop) {
      window.location.href = `/cek-sop/${notification.id_sop}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/img/logo/logo_smi.png" alt="SMI Logo" className="h-8 object-contain" />
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          {/* Notification for mobile */}
          {(auth.user.role === 'admin' || auth.user.role === 'superadmin') && (
            <button 
              onClick={() => setIsOpenNotification(!isOpenNotification)} 
              className="mr-4 relative"
            >
              <FaBell className="text-gray-700 h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {notifications.length}
                </span>
              )}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu} 
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-900 transition">Home</Link>
            <Link href="/daftar-divisi" className="text-gray-700 hover:text-blue-900 transition">Divisi</Link>
            <Link href="/panduan" className="text-gray-700 hover:text-blue-900 transition">Panduan</Link>
          </div>

          {/* Desktop Notification */}
          {(auth.user.role === 'admin' || auth.user.role === 'superadmin') && (
            <div className="relative">
              <button 
                onClick={() => setIsOpenNotification(!isOpenNotification)} 
                className="relative"
              >
                <FaBell className="text-gray-700 h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notifications.length}
                  </span>
                )}
              </button>
              {isOpenNotification && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50">
                  {notifications.length > 0 ? (
                    <ul className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <span>{notification.message}</span>
                          {notification.status === 'unread' && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                              New
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-2 text-gray-700 text-center">No notifications</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2"
              onClick={() => setIsOpenProfile(!isOpenProfile)}
            >
              <span className="text-gray-700">{auth.user.name}</span>
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpenProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-blue-900 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
            <div className="flex flex-col p-4 space-y-2">
              <Link href="/" className="text-gray-700 hover:text-blue-900 py-2">Home</Link>
              <Link href="/daftar-divisi" className="text-gray-700 hover:text-blue-900 py-2">Divisi</Link>
              <Link href="/panduan" className="text-gray-700 hover:text-blue-900 py-2">Panduan</Link>
              
              {/* Mobile Notifications */}
              {(auth.user.role === 'admin' || auth.user.role === 'superadmin') && (
                <div>
                  <div className="text-gray-700 font-semibold mt-2">Notifications</div>
                  {notifications.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="px-4 py-2 bg-gray-100 rounded flex justify-between items-center"
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <span>{notification.message}</span>
                          {notification.status === 'unread' && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                              New
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm mt-2">No notifications</p>
                  )}
                </div>
              )}
              
              {/* Mobile Logout */}
              <button 
                onClick={handleLogout} 
                className="text-left text-gray-700 hover:text-blue-900 py-2 mt-2 border-t"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}