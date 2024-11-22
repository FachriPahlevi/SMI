import React from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { FaFolder } from "react-icons/fa";

export default function Division({ division }) {
  return (
    <UserLayout>
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Daftar Divisi</h2>
        </div>

        {/* Filter*/}  
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
                <th className="p-2 border">Divisi</th>
                <th className="p-2 border">Admin</th>
                <th className="p-2 border">Terakhir Diubah</th>
                <th className="p-2 border">Ukuran File</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {division.map((division, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border text-left">
                    <div className="flex items-center gap-3">
                        <FaFolder className="text-yellow-500" />
                        {division.name}
                    </div>
                    </td>

                  <td className="p-2 border">{division.nik}</td>
                  <td className="p-2 border">{division.nik}</td>
                  <td className="p-2 border">{division.nik}</td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                    <button 
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      onClick={() => window.location.href = `daftar-sop/${division.id}`}
                    >
                      Lihat
                    </button>
                      <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Unduh
                      </button>
                    </div>
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
