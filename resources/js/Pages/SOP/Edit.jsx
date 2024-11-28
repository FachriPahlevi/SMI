import React, { useState, useEffect } from "react";
import { useForm } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Edit({ sop, division }) {
  // Inisialisasi data awal dari SOP yang ada (jika ada)
  console.log(sop);

  // State untuk file pendukung dengan validasi tambahan
  const [supportingFiles, setSupportingFiles] = useState([
    { id: Date.now(), category: '', file: null }
  ]);

  // Gunakan useForm hook dari Inertia untuk manajemen form
  const { data, setData, post, processing, errors, reset } = useForm({
    title: sop.title || '',
    description: sop.description || '',
    flowchart_file: null,
    sop_file: null,
    divisions: sop.related_division?.map(div => div.id) || [],
    supporting_files: []
  });

  const handleMainFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setData(fileType, file);
  };

  // Handler untuk perubahan file pendukung
  const handleSupportingFileChange = (index, field, value) => {
    const updatedFiles = [...supportingFiles];
    updatedFiles[index][field] = field === 'file' ? value.target.files[0] : value;
    setSupportingFiles(updatedFiles);
  };

  // Tambah input file pendukung baru
  const addSupportingFileInput = () => {
    setSupportingFiles([
      ...supportingFiles, 
      { id: Date.now(), category: '', file: null }
    ]);
  };

  // Hapus input file pendukung
  const removeSupportingFileInput = (indexToRemove) => {
    setSupportingFiles(supportingFiles.filter((_, index) => index !== indexToRemove));
  };

  // Handler untuk perubahan divisi
  const handleDivisionChange = (divisionId) => {
    setData('divisions', prevDivisions => {
      const currentDivisions = prevDivisions || [];
      return currentDivisions.includes(divisionId)
        ? currentDivisions.filter(id => id !== divisionId)
        : [...currentDivisions, divisionId];
    });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    // Tambahkan data utama
    Object.keys(data).forEach(key => {
      if (key === 'divisions') {
        // Tambahkan divisi
        data[key].forEach(divisionId => {
          formData.append('divisions[]', divisionId);
        });
      } else if (data[key] && key !== 'supporting_files') {
        formData.append(key, data[key]);
      }
    });

    // Tambahkan file pendukung
    supportingFiles.forEach((fileData, index) => {
      if (fileData.file && fileData.category) {
        formData.append(`supporting_files[${index}][category]`, fileData.category);
        formData.append(`supporting_files[${index}][file]`, fileData.file);
      }
    });

    // Kirim form data
    post('/documents', { 
      data: formData, 
      forceFormData: true 
    });
  };

  return (
    <UserLayout>
      <div className="container w-full">
        <div className="bg-white p-8 rounded-lg shadow-md mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Form Pengajuan SOP</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul */}
            <div>
              <label className="block text-gray-700 mb-2">Judul</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Masukkan Judul Dokumen"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block text-gray-700 mb-2">Deskripsi</label>
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Masukkan Deskripsi Dokumen"
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* File Utama */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Upload Flowchart</label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleMainFileChange(e, 'flowchart_file')}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.flowchart_file && <p className="text-red-500 text-sm mt-1">{errors.flowchart_file}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Upload SOP</label>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => handleMainFileChange(e, 'sop_file')}
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
                {errors.sop_file && <p className="text-red-500 text-sm mt-1">{errors.sop_file}</p>}
              </div>
            </div>

            {/* File Pendukung */}
            <div>
              <label className="block text-gray-700 mb-2">File Pendukung (Opsional)</label>
              {supportingFiles.map((file, index) => (
                <div key={file.id} className="grid md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Kategori File"
                    value={file.category}
                    onChange={(e) => handleSupportingFileChange(index, 'category', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      onChange={(e) => handleSupportingFileChange(index, 'file', e)}
                      className="flex-grow px-3 py-2 border rounded-md"
                    />
                    {supportingFiles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSupportingFileInput(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addSupportingFileInput}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                + Tambah File Pendukung
              </button>
            </div>

            {/* Pilih Divisi */}
            <div>
              <label className="block text-gray-700 mb-2">Pilih Divisi</label>
              <div className="grid md:grid-cols-2 gap-4">
                {division.map((div) => (
                  <div key={div.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`division-${div.id}`}
                      checked={data.divisions.includes(div.id)}
                      onChange={() => handleDivisionChange(div.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                    />
                    <label 
                      htmlFor={`division-${div.id}`} 
                      className="text-gray-700"
                    >
                      {div.name}
                    </label>
                  </div>
                ))}
              </div>
              {errors.divisions && <p className="text-red-500 text-sm mt-1">{errors.divisions}</p>}
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {processing ? 'Mengirim...' : 'Kirim Dokumen'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}