import React, { useState } from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaEllipsisV 
} from "react-icons/fa";

export default function User({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const itemsPerPage = 10;

  // Filter and paginate users
  const filteredUsers = user.filter((u) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <UserLayout>
      <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Manajemen User</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Kelola pengguna dalam organisasi</p>
          </div>

          {/* Filter and Action Section */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              {/* Add User Button */}
              <button 
                className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                <FaPlus className="mr-2" /> Tambah User
              </button>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                {/* Search Input */}
                <div className="relative flex-grow w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Cari User"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                {/* Status Filter */}
                <div className="relative w-full sm:w-auto">
                  <select
                    className="w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Semua Status</option>
                    <option value="enabled">Disetujui</option>
                    <option value="disabled">Ditolak</option>
                  </select>
                  <FaFilter className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">NIK</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Posisi</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Divisi</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Terakhir Diubah</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {u.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden sm:table-cell">
                        {u.nik}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                        {u.position.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                        {u.position.division.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {new Date(u.updated_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-4 text-center relative">
                        <div className="relative inline-block">
                          <button
                            onClick={() => toggleDropdown(u.id)}
                            className="text-gray-500 hover:text-blue-600 focus:outline-none"
                          >
                            <FaEllipsisV />
                          </button>

                          {openDropdownId === u.id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                              <button
                                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                              >
                                <FaEdit className="mr-2" /> Edit
                              </button>
                              <button 
                                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                              >
                                <FaTrash className="mr-2" /> Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

                {/* Empty State */}
                {paginatedUsers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Tidak ada data yang sesuai.
                  </div>
                )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}