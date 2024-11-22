import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Form({dataEdit}) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    flowchart_file: null,
    sop_file: null,
    supporting_files: [], // Store supporting file metadata
    divisions: []
  });

  const [supportingFileInputs, setSupportingFileInputs] = useState([{ id: 0, category: '', file: null }]);

  const divisionOptions = [
    { id: 'it', label: 'IT' },
    { id: 'hr', label: 'Human Resources' },
    { id: 'finance', label: 'Finance' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'operations', label: 'Operations' }
  ];

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setData(fileType, file);
  };

  const handleSupportingFileChange = (e, index) => {
    const newSupportingFiles = [...supportingFileInputs];
    newSupportingFiles[index].file = e.target.files[0];
    setSupportingFileInputs(newSupportingFiles);
  };

  const handleSupportingCategoryChange = (e, index) => {
    const newSupportingFiles = [...supportingFileInputs];
    newSupportingFiles[index].category = e.target.value;
    setSupportingFileInputs(newSupportingFiles);
  };

  const handleAddSupportingFileInput = () => {
    setSupportingFileInputs([...supportingFileInputs, { id: supportingFileInputs.length, category: '', file: null }]);
  };

  const handleDivisionChange = (divisionId) => {
    setData('divisions', prevDivisions => 
      prevDivisions.includes(divisionId)
        ? prevDivisions.filter(id => id !== divisionId)
        : [...prevDivisions, divisionId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all form data
    Object.keys(data).forEach(key => {
      if (key === 'supporting_files') {
        supportingFileInputs.forEach((fileData, index) => {
          formData.append(`supporting_files[${index}][category]`, fileData.category);
          formData.append(`supporting_files[${index}][file]`, fileData.file);
        });
      } else if (key === 'divisions') {
        data[key].forEach(division => {
          formData.append('divisions[]', division);
        });
      } else if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    post('/documents', {
      data: formData,
      forceFormData: true
    });
  };

  console.log(dataEdit);
  return (
    <UserLayout>
    <div className="mx-auto p-6 w-full">
      <div className="bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">Form Pengajuan SOP</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Judul</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              placeholder="Masukkan Judul Dokumen"
              required
              className="w-full border rounded p-2"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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
