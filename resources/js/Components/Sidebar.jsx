import React, { useState, useEffect } from 'react';
import { FaUser, FaFileAlt } from 'react-icons/fa';

export default function Sidebar({ auth }) {
  const [selectedKey, setSelectedKey] = useState(window.location.pathname);

  // Update selectedKey setiap kali URL berubah
  useEffect(() => {
    const handleLocationChange = () => {
      setSelectedKey(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigate = (path) => {
    // Redirect ke halaman dan refresh halaman
    window.location.href = path;
  };

  return (
    <div className="sidebar bg-gray-800 text-white h-full w-64">
      <div className="sidebar-header text-center py-4 text-xl font-bold border-b border-gray-600">
        {auth.user.role}
      </div>
      <ul className="menu mt-4">
        {/* Manajemen User */}
        {auth.user.role !== 'superadmin' ? null :
          <li
            className={`menu-item px-4 py-2 flex items-center cursor-pointer ${
              selectedKey === '/manajemen-user' ? 'bg-gray-700' : ''
            }`}
            onClick={() => navigate('/manajemen-user')}
          >
            <FaUser className="mr-2" />
            Manajemen User
          </li>
        }
        {/* End Manajemen User */}
        <li
          className={`menu-item px-4 py-2 flex items-center cursor-pointer ${
            selectedKey === '/daftar-sop' || selectedKey === '/daftar-divisi' ? 'bg-gray-700' : ''
          }`}
          onClick={() => navigate('/daftar-divisi')}
        >
          <FaFileAlt className="mr-2" />
          Daftar SOP
        </li>
      </ul>
    </div>
  );
}
