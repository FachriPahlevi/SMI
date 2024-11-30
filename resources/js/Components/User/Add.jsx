import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';

export default function Add({ isOpen, onClose, onSubmit, position, division }) {
  if (!isOpen) return null;

  const { data, setData, processing, errors } = useForm({
    name: '',
    nik: '',
    role:'',
    password: '',
    id_position: '',
  });

  const [filteredPositions, setFilteredPositions] = useState([]);

  useEffect(() => {
    if (data.id_division) {
      const positionsForDivision = position.filter(
        (pos) => pos.id_division === parseInt(data.id_division)
      );
      setFilteredPositions(positionsForDivision);
      // Reset position when division changes
      setData('id_position', '');
    } else {
      setFilteredPositions([]);
    }
  }, [data.id_division]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

// Modifikasi bagian handleSubmit di komponen React
const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmSubmit = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Periksa kembali data user yang akan ditambahkan',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Tambah!',
        cancelButtonText: 'Batal',
    });

    if (!confirmSubmit.isConfirmed) return;

    try {
        const formData = {
            name: data.name,
            nik: data.nik,
            role: data.role,
            password: data.password,
            id_position: data.id_position,
            id_division: data.id_division,
        };

        const response = await axios.post(route('user.store'), formData);

        Swal.fire({
            title: 'Berhasil!',
            text: 'User berhasil ditambahkan.',
            icon: 'success',
            confirmButtonText: 'Oke',
            confirmButtonColor: '#3085d6'
        });

        onClose(); // Close the modal
        window.location.reload();
    } catch (error) {
        Swal.fire({
            title: 'Gagal!',
            text: error.response?.data?.message || 'Terjadi kesalahan saat menambahkan user',
            icon: 'error',
            confirmButtonText: 'Tutup',
            confirmButtonColor: '#d33'
        });
        console.error('Error adding user:', error);
    }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Tambah User</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
          <select
              name="id_division"
              value={data.id_division}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Pilih Divisi</option>
              {division.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>
            <select
              name="id_position"
              value={data.id_position}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              disabled={!data.id_division}
            >
              <option value="">Pilih Posisi</option>
              {filteredPositions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.name}
                </option>
              ))}
            </select>
            <select
              name="role"
              value={data.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Pilih Posisi</option>
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={data.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="nik" 
              placeholder="NIK"
              value={data.nik}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password" 
              placeholder="Password"
              value={data.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={processing}
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}