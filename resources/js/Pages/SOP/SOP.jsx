import React from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { FaFolder } from "react-icons/fa";

export default function SOP({ sop }) {
  return (
    <UserLayout>
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Daftar SOP</h2>
        </div>

        {/* Filter Section */}  
        <div className="flex items-center justify-between text-gray-400  mb-4">
            <p>Daftar Divisi / Daftar SOP</p>
          <div className="flex gap-4">
            <select className="border rounded py-1">
              <option value="">Semua  Status</option>
              <option value="enabled">Disetujui</option>
              <option value="disabled">Ditolak</option>
              <option value="disabled">Menunggu</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-2 py-1"
            />
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-gray-600 p-2"
                onClick={() => window.location.href = '/tambah-sop'}>
              + Tambah    
              </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Judul</th>
                <th className="p-2 border">Dibuat Oleh</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Terakhir Diubah</th>
                <th className="p-2 border">Ukuran File</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sop.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border text-left">
                    <div className="flex items-center gap-3">
                        <FaFolder className="text-yellow-500" />
                        {item.title}
                    </div>
                    </td>

                  <td className="p-2 border">{item.user.name}</td>
                  <td className="p-2 border">{item.status}</td>
                  <td className="p-2 border text-gray-500">
                    {new Date(item.updated_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="p-2 border">{item.nik}</td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      onClick={() => window.location.href = `/cek-sop/${item.id}`}
                    >
                      Lihat
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      onClick={() => window.location.href = `/edit-sop/${item.id}`}
                    >
                      Edit
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
