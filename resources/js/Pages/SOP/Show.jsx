import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Form({sop}) {

  const divisionOptions = [
    { id: 'it', label: 'IT' },
    { id: 'hr', label: 'Human Resources' },
    { id: 'finance', label: 'Finance' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'operations', label: 'Operations' }
  ];

  console.log({sop});
  return (
    <UserLayout>
    <div className="mx-auto p-6 w-full">
      <div className="bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Form Pengajuan SOP</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
                Judul
            </label>
            <input
                id="title"
                type="text"
                value={sop?.title || ''}
                onChange={(e) => setData('title', e.target.value)}
                placeholder={sop[0].value}
                disabled
                className="w-full border rounded p-2 bg-gray-100 text-gray-700 cursor-not-allowed"
            />
            {errors?.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
        </div>


          <div>
            <label className="block mb-2">Deskripsi</label>
            <textarea
              className="w-full border rounded p-2"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Masukkan Deskripsi Dokumen"
              required
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label className="block mb-2">Upload Flowchart</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleFileChange(e, 'flowchart_file')}
                required
                className="w-full border rounded p-2"
              />
              {errors.flowchart_file && <p className="text-red-500 text-sm">{errors.flowchart_file}</p>}
            </div>

            <div>
              <label className="block mb-2">Upload SOP</label>
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={(e) => handleFileChange(e, 'sop_file')}
                required
                className="w-full border rounded p-2"
              />
              {errors.sop_file && <p className="text-red-500 text-sm">{errors.sop_file}</p>}
            </div>
          </div>
          <div>
            <label className="block mb-2">Tambah File Pendukung (Opsional)</label>
            {supportingFileInputs.map((input, index) => (
              <div key={input.id} className="mb-4 grid grid-cols-2 gap-5">
                <input
                  type="text"
                  value={input.category}
                  onChange={(e) => handleSupportingCategoryChange(e, index)}
                  placeholder="Masukkan Kategori"
                  className="w-full border rounded p-2 mt-2"
                />
                <input
                  type="file"
                  onChange={(e) => handleSupportingFileChange(e, index)}
                  className="w-full border rounded p-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSupportingFileInput}
              className="text-blue-600 underline"
            >
              Tambah File Pendukung
            </button>
          </div>

          <div>
            <label className="block mb-2">Pilih Divisi</label>
            <div className="grid grid-cols-2 gap-4">
              {divisionOptions.map((division) => (
                <div key={division.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={division.id}
                    checked={data.divisions.includes(division.id)}
                    onChange={() => handleDivisionChange(division.id)}
                    className="form-checkbox"
                  />
                  <label htmlFor={division.id} className="text-sm">{division.label}</label>
                </div>
              ))}
            </div>
            {errors.divisions && <p className="text-red-500 text-sm">{errors.divisions}</p>}
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {processing ? 'Mengirim...' : 'Kirim Dokumen'}
          </button>
        </form>
      </div>
    </div>
    </UserLayout>
  );
}
