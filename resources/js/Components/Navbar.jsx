import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { 
  BellIcon, 
  MenuIcon, 
  XIcon, 
  LogOutIcon, 
  HomeIcon, 
  FolderIcon, 
  BookOpenIcon 
} from 'lucide-react';
import axios from 'axios';

export default function Navbar({ auth }) {
  const { post } = useForm();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (auth.user.role === 'admin' || auth.user.role === 'superadmin') {
      axios.get('/notifications')
        .then((response) => {
          if (response.data.success && response.data.data) {
            setNotifications(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    post(route('logout'), {
      onSuccess: () => {
        window.location.href = '/login';
      },
    });
  };

  const handleNotificationClick = (id) => {
    const notification = notifications.find((notif) => notif.id === id);
    if (notification && notification.id_sop) {
      window.location.href = `/cek-sop/${notification.id_sop}`;
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <img 
            src="/img/logo/logo_smi.png" 
            alt="SMI Logo" 
            className="h-10 object-contain" 
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Notification for mobile */}
          {(auth.user.role === 'admin' || auth.user.role === 'superadmin') && (
            <button 
              onClick={() => setIsOpenNotification(!isOpenNotification)} 
              className="relative"
            >
              <BellIcon className="text-gray-700 h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {notifications.length}
                </span>
              )}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            <Link 
              href="/" 
              className="flex items-center text-gray-600 hover:text-blue-700 transition-colors group"
            >
              Home
            </Link>
            <Link 
              href="/daftar-divisi" 
              className="flex items-center text-gray-600 hover:text-blue-700 transition-colors group"
            >
              Divisi
            </Link>
            <Link 
              href="/panduan" 
              className="flex items-center text-gray-600 hover:text-blue-700 transition-colors group"
            >
              Panduan
            </Link>
          </nav>

          {/* Notifications */}
          {(auth.user.role === 'admin' || auth.user.role === 'superadmin') && (
            <div className="relative">
              <button 
                onClick={() => setIsOpenNotification(!isOpenNotification)} 
                className="relative text-gray-600 hover:text-blue-700 transition-colors"
              >
                <BellIcon className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notifications.length}
                  </span>
                )}
              </button>
              {isOpenNotification && (
                <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b font-semibold text-gray-700">
                    Notifications
                  </div>
                  {notifications.length > 0 ? (
                    <ul className="max-h-64 overflow-y-auto divide-y">
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                          onClick={() => handleNotificationClick(notification.id)}
                        >
                          <span className="text-sm text-gray-700">{notification.message}</span>
                          {notification.status === 'unread' && (
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                              New
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No notifications</div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-700 transition-colors"
              onClick={() => setIsOpenProfile(!isOpenProfile)}
            >
              <span className="font-medium">{auth.user.name}</span>
              <svg 
                className="w-5 h-5" 
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
            {isOpenProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOutIcon className="w-5 h-5 mr-3 text-gray-500" />
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
              <Link 
                href="/" 
                className="flex items-center text-gray-700 hover:text-blue-900 py-2"
              >
                <HomeIcon className="w-5 h-5 mr-3" /> Home
              </Link>
              <Link 
                href="/daftar-divisi" 
                className="flex items-center text-gray-700 hover:text-blue-900 py-2"
              >
                <FolderIcon className="w-5 h-5 mr-3" /> Divisi
              </Link>
              <Link 
                href="/panduan" 
                className="flex items-center text-gray-700 hover:text-blue-900 py-2"
              >
                <BookOpenIcon className="w-5 h-5 mr-3" /> Panduan
              </Link>
              
              {/* Mobile Logout */}
              <button 
                onClick={handleLogout} 
                className="flex items-center text-gray-700 hover:text-blue-900 py-2 mt-2 border-t"
              >
                <LogOutIcon className="w-5 h-5 mr-3" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}