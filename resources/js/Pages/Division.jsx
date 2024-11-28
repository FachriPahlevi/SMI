import React from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { FaFolder } from "react-icons/fa";

export default function Division({ division }) {
  console.log("division", division);
  return (
    <UserLayout>
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Daftar Divisi</h2>
        </div>

        {/* Filter */}
        <div className="flex items-center justify-between mb-4">
          <p className='text-gray-400'>Daftar Divisi</p>
          <div className="flex gap-4">
            <select className="border rounded py-1">
              <option value="">Status</option>
              <option value="enabled">Disetujui</option>
              <option value="disabled">Ditolak</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 ">Divisi</th>
                <th className="p-2 ">Admin</th>
                <th className="p-2 ">Terakhir Diubah</th>
              </tr>
            </thead>
            <tbody>
              {division.map((division, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-500"
                  onClick={() => window.location.href= `/daftar-sop/${division.id}`}
                >
                  <td className="p-2 text-left">
                    <div className="flex items-center gap-3">
                      <FaFolder className="text-yellow-500" />
                      {division.name}
                    </div>
                  </td>

                  {/* Menampilkan nama admin dari divisi */}
                  <td className="p-2 ">
                    {division.position && division.position.length > 0
                      ? division.position
                          .flatMap(position => position.user) // Mendapatkan semua user dari posisi
                          .filter(user => user.role === "admin") // Memfilter user dengan role admin
                          .map(admin => admin.name)
                          .join(", ") || "Tidak Ada Admin"
                      : "Tidak Ada Admin"}
                  </td>

                  <td className="p-2 border text-gray-500">
                    {new Date(division.updated_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 border rounded">Prev</button>
          <button className="ml-2 px-4 py-2 border rounded">Next</button>
        </div>
      </div>
    </UserLayout>
  );
}
