import React, { useState } from 'react';
import UserLayout from '@/Layouts/UserLayout';

export default function Form({ sop = [], division = [] }) {
  console.log("sop",sop);
  console.log("division",sop.related_divisions);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Open modal and set the image
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => setIsOpen(false);

  return (
    <UserLayout>
      <div className="mx-auto p-6 w-full">
        <p className="text-gray-400">Divisi / SOP / Show</p>
        <div className="bg-white p-6 rounded shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Detail SOP</h1>
          <div className="space-y-6">
            {/* Menampilkan Data SOP */}
            {sop.length > 0 ? (
              sop.map((item) => (
                <div key={item.id} className="space-y-4 border-b pb-4 mb-4">
                  {/* Judul SOP */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Judul</label>
                    <p className="text-gray-700 border rounded p-2 bg-gray-100">{item.title || 'Tidak ada judul'}</p>
                  </div>

                  {/* Division */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Division</label>         
                      <p className="text-gray-700 border rounded p-2 bg-gray-100">
                        {item.division.name || 'Tidak ada nama divisi'}
                      </p>
                  </div>

                  {/* Deskripsi SOP */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Deskripsi</label>
                    <p className="text-gray-700 border rounded p-2 bg-gray-100">{item.description || 'Tidak ada deskripsi'}</p>
                  </div>

                  {/* File SOP */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">File SOP</label>
                    <div className="mb-2">
                      <a
                        href={`/storage/sop/${item.sop?.split('/').pop()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {item.sop ? 'Lihat File PDF' : 'File tidak tersedia'}
                      </a>
                    </div>
                  </div>

                  {/* File Flowchart */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">File Flowchart</label>
                    <div className="mb-2">
                      {item.flowchart ? (
                        <>
                          {/* Thumbnail */}
                          <img
                            src={`/storage/flowchart/${item.flowchart?.split('/').pop()}`}
                            alt={`Flowchart ${item.title}`}
                            className="border rounded cursor-pointer"
                            style={{ width: '150px', height: 'auto' }}
                            onClick={() => openModal(`/storage/flowchart/${item.flowchart?.split('/').pop()}`)}
                          />

                          {/* Download Link */}
                          <div className="mt-2">
                            <a
                              href={`/storage/flowchart/${item.flowchart?.split('/').pop()}`}
                              download
                              className="text-blue-500 underline"
                            >
                              Unduh Flowchart
                            </a>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-700">Flowchart tidak tersedia</p>
                      )}
                    </div>
                  </div>

                  {/* Status SOP */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Status</label>
                    <p className="text-gray-700 border rounded p-2 bg-gray-100">{item.status || 'Tidak ada status'}</p>
                  </div>

                  {/* Dibuat Pada */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Dibuat Pada</label>
                    <p className="text-gray-700 border rounded p-2 bg-gray-100">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Tanggal tidak tersedia'}
                    </p>
                  </div>

                  {/* Diperbarui Tanggal */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Diperbarui Tanggal</label>
                    <p className="text-gray-700 border rounded p-2 bg-gray-100">
                      {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'Tanggal tidak tersedia'}
                    </p>
                  </div>
                  <div>
  <label className="block mb-2 font-medium text-gray-700">Divisi Terkait</label>
  <div className="grid grid-cols-2 gap-4">
    {item.related_divisions && item.related_divisions.length > 0 ? (
      item.related_divisions.map((div) => (
        <p key={div.id} className="text-gray-700 border rounded p-2 bg-gray-100">
          {div.name || 'Tidak ada nama divisi'}
        </p>
      ))
    ) : (
      <p className="text-gray-700">Tidak ada divisi terkait</p>
    )}
  </div>
</div>

                  </div>
              ))
            ) : (
              <p className="text-gray-700">Tidak ada data SOP yang tersedia.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal untuk menampilkan gambar yang diperbesar */}
      {isOpen && (
        <div className="modal-open fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <button onClick={closeModal} className="absolute top-0 right-0 text-gray-500">X</button>
            <img src={selectedImage} alt="Selected" className="max-w-full max-h-full" />
          </div>
        </div>
      )}
    </UserLayout>
  );
}
