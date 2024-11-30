import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { 
  FaFolder, 
  FaEllipsisV, 
  FaSearch, 
  FaFilter, 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaTrash 
} from "react-icons/fa";
import Swal from 'sweetalert2';
import { Head } from "@inertiajs/react";

export default function SOP({ sop, division, auth }) {

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

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(route('sop.destroy', id)); // Sesuaikan route untuk delete
  
          if (response.status === 200) { // Periksa apakah respons sukses
            Swal.fire('Berhasil!', 'Data berhasil dihapus.', 'success');
            // Tambahkan logika untuk memperbarui data di tabel
            window.location.reload();
          } else {
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
          }
        } catch (error) {
          Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data.', 'error');
          console.error(error);
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'disetujui': return { colorClass: 'bg-green-100 text-green-800', displayText: 'DISETUJUI' };
      case 'ditolak': return { colorClass: 'bg-red-100 text-red-800', displayText: 'DITOLAK' };
      case 'menunggu': return { colorClass: 'bg-yellow-100 text-yellow-800', displayText: 'MENUNGGU' };
      default: return { colorClass: 'bg-gray-100 text-gray-800', displayText: 'UNKNOWN' };
    }
  };

  return (
    <UserLayout>
      <Head title={`Daftar SOP ${division.name}`} />
      <div className="bg-gray-50 min-h-screen p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Daftar SOP {division.name}</h2>
            <p className="text-gray-600 mt-2">Kelola dan pantau Standar Operasional Prosedur</p>
          </div>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              {auth.user.role === 'admin' || auth.user.role === 'superadmin' ? (
              <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => (window.location.href = "/tambah-sop")}
            >
              <FaPlus className="mr-2" /> Tambah SOP
            </button>
              )
            :
            null
            }
              <div className="flex items-center space-x-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Cari SOP"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                <div className="relative">
                  <select
                    className="appearance-none w-full pl-8 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Semua Status</option>
                    <option value="disetujui">Disetujui</option>
                    <option value="ditolak">Ditolak</option>
                    <option value="menunggu">Menunggu</option>
                  </select>
                  <FaFilter className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

             
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden pb-24">
            <table className="min-w-full p-12">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dibuat Oleh</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terakhir Diubah</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSop.length > 0 ? (
                  filteredSop.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <FaFolder className="text-yellow-500 mr-3 text-xl" />
                          <span className="font-medium text-gray-900">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{item.user.name}</td>
                      <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status).colorClass}`}>
                        {getStatusColor(item.status).displayText}
                      </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        {new Date(item.updated_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-4 text-center relative">
                        <div className="relative inline-block">
                          <button
                            onClick={() => toggleDropdown(item.id)}
                            className="text-gray-500 hover:text-blue-600 focus:outline-none"
                          >
                            <FaEllipsisV />
                          </button>

                          {openDropdownId === item.id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-9999">
                              <button
                                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                                onClick={() => (window.location.href = `/cek-sop/${item.id}`)}
                              >
                                <FaEye className="mr-2" /> Detail
                              </button>
                              {auth.user.role === 'admin' || auth.user.role === 'superadmin' ? (
                              <>
                                <button
                                  className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                                  onClick={() => (window.location.href = `/edit-sop/${item.id}`)}
                                >
                                  <FaEdit className="mr-2" /> Edit
                                </button>
                                <button
                                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                                onClick={() => handleDelete(item.id)}
                              >
                                <FaTrash className="mr-2" /> Hapus
                              </button>

                              </>
                            ) : null}         
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      Tidak ada data yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}