import React from 'react';
import UserLayout from '@/Layouts/UserLayout';

export default function User({ user }) {
  console.log(user);
  return (
    <UserLayout>
      <div className="p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Manajemen User</h2>
        </div>

        {/* Filter Section */}
        <div className="flex items-center justify-between mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add User
          </button>
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

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">NIK</th>
                <th className="p-2 border">Posisi</th>
                <th className="p-2 border">Divisi</th>
                <th className="p-2 border">Last Upload</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.nik}</td>
                  <td className="p-2 border">{user.position.name}</td>
                  <td className="p-2 border">{user.position.division.name}</td>
                  <td className="p-2 border text-gray-500">
                    {new Date(user.updated_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <button className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Hapus
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
