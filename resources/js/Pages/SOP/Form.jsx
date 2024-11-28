import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

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

    // Debug log
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
      // Make the POST request using axios
      const response = await axios.post(route('sop.store'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle success response
      if (response.status === 200) {
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
        alert('SOP submitted successfully!');
      }
    } catch (error) {
      // Handle error
      console.error('Error submitting SOP:', error);
      alert('There was an error submitting the SOP. Please try again.');
    }
  };

  return (
    <UserLayout>
      <div className="mx-auto p-6 w-full">
        <div className="bg-white p-6 rounded shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Form Pengajuan SOP</h1>
          <form onSubmit={handleSubmit} encType='multipart/form-data' className="space-y-6">
            {/* Add main division field */}
            <div>
              <label className="block mb-2">Divisi Utama</label>
              <select
                value={data.id_division}
                onChange={(e) => setData('id_division', e.target.value)}
                required
                className="w-full border rounded p-2"
              >
                <option value="">Pilih Divisi</option>
                {division.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
              {errors.id_division && <p className="text-red-500 text-sm">{errors.id_division}</p>}
            </div>

            {/* Title field */}
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

            {/* Description field */}
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

            {/* File upload fields */}
            <div className="grid grid-cols-2 gap-5">
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

            {/* Supporting files section */}
            <div>
              <label className="block text-gray-700 mb-2">Tambah File Pendukung (Opsional)</label>
              {supportingFileInputs.map((input, index) => (
                <div key={input.id} className="mb-4 grid md:grid-cols-2 gap-4 mb-4 shadow-md p-3">
                  <input
                    type="text"
                    value={input.name}
                    onChange={(e) => handleSupportingNameChange(e, index)}
                    placeholder="Masukkan Nama"
                    className="w-full border rounded p-2 mt-2"
                  />
                  <div className='flex items-center space-x-2'> 
                    <input
                      type="file"
                      onChange={(e) => handleSupportingFileChange(e, index)}
                      className="w-full border rounded p-2"
                    />
                    {supportingFileInputs.length > 1 && (
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
                onClick={handleAddSupportingFileInput}
                className="text-blue-600 underline"
              >
                +Tambah File Pendukung
              </button>
            </div>

            {/* Division selection */}
            <div>
              <label className="block mb-2">Pilih Divisi Yang Terkait Dengan SOP Ini</label>
              <div className="grid grid-cols-2 gap-4">
                {division.map((div) => (
                  <div key={div.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={data.divisions.includes(div.id)}
                      onChange={() => handleDivisionChange(div.id)}
                      className="h-4 w-4"
                    />
                    <span>{div.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white p-3 rounded ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={processing}
            >
              {processing ? 'Submitting...' : 'Kirim SOP'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
