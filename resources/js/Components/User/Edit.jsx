import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Edit({ isOpen, onClose, user, position, division }) {
  if (!isOpen) return null;

  // Find the position object that matches user's id_position
  const userPosition = position.find(pos => pos.id === user.id_position);
  // Get the corresponding division_id from the position
  const userDivisionId = userPosition ? userPosition.id_division : '';

  const { data, setData, processing, errors } = useForm({
    name: user.name || '',
    nik: user.nik || '',
    role: user.role || '',
    password: '',
    id_position: user.id_position || '',
    id_division: userDivisionId || '', // Initialize with the division ID from position
  });

  const [filteredPositions, setFilteredPositions] = useState([]);

  useEffect(() => {
    // Initially set the filtered positions based on the user's division
    const positionsForDivision = position.filter(
      (pos) => pos.id_division === parseInt(data.id_division)
    );
    setFilteredPositions(positionsForDivision);
  }, []);

  useEffect(() => {
    if (data.id_division) {
      const positionsForDivision = position.filter(
        (pos) => pos.id_division === parseInt(data.id_division)
      );
      setFilteredPositions(positionsForDivision);
      
      if (!positionsForDivision.find(pos => pos.id === data.id_position)) {
        setData('id_position', '');
      }
    } else {
      setFilteredPositions([]);
      setData('id_position', '');
    }
  }, [data.id_division, position, setData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmSubmit = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Periksa kembali data user yang akan diedit',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Edit!',
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

      const response = await axios.put(route('user.update', user.id), formData);

      Swal.fire({
        title: 'Berhasil!',
        text: 'User berhasil diedit.',
        icon: 'success',
        confirmButtonText: 'Oke',
        confirmButtonColor: '#3085d6',
      });

      onClose();
      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: 'Gagal!',
        text: error.response?.data?.message || 'Terjadi kesalahan saat mengedit user',
        icon: 'error',
        confirmButtonText: 'Tutup',
        confirmButtonColor: '#d33',
      });
      console.error('Error editing user:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <select
              name="id_division"
              value={data.id_division}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded shadow focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded shadow focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border rounded shadow focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Pilih Role</option>
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
              className="w-full px-4 py-2 border rounded shadow focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="nik"
              placeholder="NIK"
              value={data.nik}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded shadow focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password (Biarkan kosong jika tidak ingin mengubah)"
              value={data.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded shadow focus:ring-2 focus:ring-blue-500"
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}