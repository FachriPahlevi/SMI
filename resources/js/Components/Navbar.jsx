import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { FaBell } from "react-icons/fa";
import axios from 'axios';

export default function Navbar({ auth }) {
  const { post } = useForm();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

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
    axios.post(`/api/notifications/${id}/mark-as-read`)
      .then((response) => {
        // Update status notifikasi menjadi "read" di state
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id ? { ...notification, status: 'read' } : notification
          )
        );
  
        // Cari notifikasi yang sesuai untuk mendapatkan id_sop
        const notification = notifications.find((notif) => notif.id === id);
        if (notification && notification.id_sop) {
          window.location.href = `/cek-sop/${notification.id_sop}`;
        } else {
          console.error('id_sop tidak ditemukan pada notifikasi.');
        }
      })
      .catch((error) => {
        console.error('Error updating notification status:', error);
      });
  };

  return (
    <nav className="bg-white shadow-md z-999 px-12">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <img src="/img/logo/logo_smi.png" alt="SMI Logo" className="h-8" />
          </Link>

          <div className="flex items-center">
            <div className="hidden md:flex space-x-8 mr-5">
              <Link href="/" className="text-gray-700 hover:text-blue-900">Home</Link>
              <div className="relative group">
                <Link href="/daftar-divisi" className="text-gray-700 hover:text-blue-900">Divisi</Link>
              </div>
              <Link href="/panduan" className="text-gray-700 hover:text-blue-900">Panduan</Link>
            </div>
            {/* Notification */}
            {auth.user.role === 'admin' || auth.user.role === 'superadmin' ?
           <div className='notification'>
           <button className="relative" onClick={() => {
             setIsOpenProfile(false); // Menutup profil saat notifikasi dibuka
             setIsOpenNotification(!isOpenNotification);
           }}>
             <FaBell className="text-black h-5 w-5 mr-5" />
           </button>
           {isOpenNotification && (
             <div className="absolute right-0 mt-2 w-64 mr-12 bg-white shadow-lg rounded-md z-50">
               {notifications.length > 0 ? (
                 <ul
                   className="py-2 max-h-64 overflow-y-auto"
                   style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent' }}
                 >
                   {notifications.map((notification) => (
                     <li
                       key={notification.id}
                       className={`flex justify-between items-center shadow border px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer`}
                       onClick={() => handleNotificationClick(notification.id)}
                     >
                       <span>{notification.message}</span>
                       {notification.status === 'unread' && (
                         <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                           New
                         </span>
                       )}
                     </li>
                   ))}
                 </ul>
               ) : (
                 <div className="px-4 py-2 text-gray-700">No notifications available.</div>
               )}
             </div>
           )}
         </div>
         : <div></div> 
          }
            {/* End Notification */}
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none" onClick={() => {
                setIsOpenNotification(false); // Menutup notifikasi saat profil dibuka
                setIsOpenProfile(!isOpenProfile);
              }}>
                <span className="text-gray-700">{auth.user.name}</span>
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpenProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <ul className="py-1">
                    <li>
                      <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-900">Logout</button>
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
