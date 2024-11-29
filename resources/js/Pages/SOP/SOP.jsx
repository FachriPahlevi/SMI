import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { FaFolder, FaEllipsisV } from "react-icons/fa";

export default function SOP({ sop, division }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Filter data SOP berdasarkan pencarian dan status
  const filteredSop = sop.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <UserLayout>
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Daftar SOP {division.name}</h2>
        </div>

        {/* Filter Section */}
        <div className="flex items-center justify-between text-gray-400 mb-4">
          <p>Divisi / SOP {division.name}</p>
          <div className="flex gap-4">
            {/* Filter Status */}
            <select
              className="border rounded py-1"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="disetujui">Disetujui</option>
              <option value="ditolak">Ditolak</option>
              <option value="menunggu">Menunggu</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Cari SOP"
              className="border rounded px-2 py-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Tambah SOP Button */}
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              onClick={() => (window.location.href = "/tambah-sop")}
            >
              + Tambah
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Judul</th>
                <th className="p-2 border">Dibuat Oleh</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Terakhir Diubah</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSop.length > 0 ? (
                filteredSop.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="p-2 border text-left">
                      <div className="flex items-center gap-3">
                        <FaFolder className="text-yellow-500" />
                        {item.title}
                      </div>
                    </td>
                    <td className="p-2 border">{item.user.name}</td>
                    <td className="p-2 border">{item.status}</td>
                    <td className="p-2 border text-gray-500">
                      {new Date(item.updated_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-2 border text-center">
                      {/* Dropdown Button */}
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(item.id)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-600 p-2 rounded-full"
                        >
                          <FaEllipsisV />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdownId === item.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                              onClick={() => (window.location.href = `/cek-sop/${item.id}`)}
                            >
                              Lihat
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                              onClick={() => (window.location.href = `/edit-sop/${item.id}`)}
                            >
                              Edit
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-2 text-center text-gray-500">
                    Tidak ada data yang sesuai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
}
