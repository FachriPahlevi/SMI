import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { 
  FaFolder, 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaEllipsisV 
} from "react-icons/fa";

export default function Division({ division }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Filter divisions based on search and status
  const filteredDivisions = division.filter((div) => {
    const matchesSearch = div.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Add status filtering logic if needed
    return matchesSearch;
  });

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <UserLayout>
      <Head title="Divisi" />
      <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Daftar Divisi</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Kelola dan pantau divisi dalam organisasi</p>
          </div>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
                {/* Search Input */}
                <div className="relative flex-grow w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Cari Divisi"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Divisi</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Admin</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Terakhir Diubah</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDivisions.length > 0 ? (
                    filteredDivisions.map((div) => (
                      <tr key={div.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <FaFolder className="text-yellow-500 mr-3 text-xl" />
                            <span className="font-medium text-gray-900">{div.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600 hidden sm:table-cell">
                          {div.position && div.position.length > 0
                            ? div.position
                                .flatMap(position => position.user)
                                .filter(user => user.role === "admin")
                                .map(admin => admin.name)
                                .join(", ") || "Tidak Ada Admin"
                            : "Tidak Ada Admin"}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          {new Date(div.updated_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-4 text-center relative">
                          <div className="relative inline-block">
                            <button
                              onClick={() => toggleDropdown(div.id)}
                              className="text-gray-500 hover:text-blue-600 focus:outline-none"
                            >
                              <FaEllipsisV />
                            </button>

                            {openDropdownId === div.id && (
                              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
                                <button
                                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                                  onClick={() => window.location.href = `/daftar-sop/${div.id}`}
                                >
                                  <FaEye className="mr-2" /> Lihat SOP
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                        Tidak ada data yang sesuai.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}