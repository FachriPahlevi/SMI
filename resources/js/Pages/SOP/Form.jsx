import React, { useState } from 'react';
import axios from 'axios';
import { Head, useForm } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import Swal from 'sweetalert2';

export default function Form({ division }) {
  const { data, setData, processing, errors } = useForm({
    title: '',
    description: '',
    flowchart_file: null,
    sop_file: null,
    supporting_files: [],
    divisions: [],
    id_division: '',
  });

  const [supportingFileInputs, setSupportingFileInputs] = useState([{ id: 0, name: '', file: null }]);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setData(fileType, file);
    }
  };

  const handleSupportingFileChange = (e, index) => {
    const newSupportingFiles = [...supportingFileInputs];
    const file = e.target.files[0];
    if (file) {
      newSupportingFiles[index] = { ...newSupportingFiles[index], file };
      setSupportingFileInputs(newSupportingFiles);
    }
  };

  const removeSupportingFileInput = (indexToRemove) => {
    setSupportingFileInputs(supportingFileInputs.filter((_, index) => index !== indexToRemove));
  };

  const handleSupportingNameChange = (e, index) => {
    const newSupportingFiles = [...supportingFileInputs];
    newSupportingFiles[index].name = e.target.value;
    setSupportingFileInputs(newSupportingFiles);
  };

  const handleAddSupportingFileInput = () => {
    setSupportingFileInputs([...supportingFileInputs, { id: supportingFileInputs.length, name: '', file: null }]);
  };

  const handleDivisionChange = (divisionId) => {
    const currentDivisions = Array.isArray(data.divisions) ? [...data.divisions] : [];
    const newDivisions = currentDivisions.includes(divisionId)
      ? currentDivisions.filter(id => id !== divisionId)
      : [...currentDivisions, divisionId];
    setData('divisions', newDivisions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation before submission
    const confirmSubmit = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Periksa kembali data SOP yang akan diajukan',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Kirim!',
      cancelButtonText: 'Batal'
    });

    if (!confirmSubmit.isConfirmed) return;

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('id_division', data.id_division);
    formData.append('flowchart_file', data.flowchart_file);
    formData.append('sop_file', data.sop_file);
    data.divisions.forEach((division) => {
        formData.append('divisions[]', division);
    });

    supportingFileInputs.forEach((file, index) => {
        formData.append(`supporting_files[${index}][name]`, file.name);
        formData.append(`supporting_files[${index}][file]`, file.file);
    });

    try {
      const response = await axios.post(route('sop.store'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Success Sweet Alert
      Swal.fire({
        title: 'Berhasil!',
        text: 'SOP berhasil diajukan.',
        icon: 'success',
        confirmButtonText: 'Oke',
        confirmButtonColor: '#3085d6'
      });
      window.location.reload();
      // Reset form
      setData({
        title: '',
        description: '',
        flowchart_file: null,
        sop_file: null,
        supporting_files: [],
        divisions: [],
        id_division: '',
      });
      setSupportingFileInputs([{ id: 0, name: '', file: null }]);

    } catch (error) {
      // Error Sweet Alert
      Swal.fire({
        title: 'Gagal!',
        text: error.response?.data?.message || 'Terjadi kesalahan saat mengajukan SOP',
        icon: 'error',
        confirmButtonText: 'Tutup',
        confirmButtonColor: '#d33'
      });
      console.error('Error submitting SOP:', error);
    }
  };

  return (
    <UserLayout>
      <Head title="Pengajuan SOP" />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Formulir Pengajuan Standar Operasional Prosedur
            </h1>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Main Division Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Divisi Utama</label>
              <select
                value={data.id_division}
                onChange={(e) => setData('id_division', e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Divisi</option>
                {division.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
              {errors.id_division && <p className="text-red-500 text-sm mt-1">{errors.id_division}</p>}
            </div>

            {/* Title Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Judul SOP</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Masukkan Judul Dokumen"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Deskripsi</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Masukkan Deskripsi Dokumen"
                required
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* File Upload Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Upload Flowchart</label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileChange(e, 'flowchart_file')}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.flowchart_file && <p className="text-red-500 text-sm mt-1">{errors.flowchart_file}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Upload SOP</label>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => handleFileChange(e, 'sop_file')}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.sop_file && <p className="text-red-500 text-sm mt-1">{errors.sop_file}</p>}
              </div>
            </div>

            {/* Supporting Files Section */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">File Pendukung (Opsional)</label>
              {supportingFileInputs.map((input, index) => (
                <div key={input.id} className="mb-4 grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    value={input.name}
                    onChange={(e) => handleSupportingNameChange(e, index)}
                    placeholder="Nama File Pendukung"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className='flex items-center space-x-2'> 
                    <input
                      type="file"
                      onChange={(e) => handleSupportingFileChange(e, index)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {supportingFileInputs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSupportingFileInput(index)}
                        className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSupportingFileInput}
                className="text-blue-600 hover:text-blue-800 font-semibold mt-2 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Tambah File Pendukung
              </button>
            </div>

            {/* Division Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Divisi Terkait</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {division.map((div) => (
                  <div key={div.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`div-${div.id}`}
                      checked={data.divisions.includes(div.id)}
                      onChange={() => handleDivisionChange(div.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`div-${div.id}`} className="text-gray-700">{div.name}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={processing}
              >
                {processing ? 'Mengirim...' : 'Kirim Pengajuan SOP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}