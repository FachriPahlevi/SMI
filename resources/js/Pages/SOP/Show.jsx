import React, { useState } from 'react';
import UserLayout from '@/Layouts/UserLayout';

export default function Form({ sop = [], supportedFile = [], division = [] }) {
  console.log(supportedFile);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Open modal and set the image
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => setIsOpen(false);

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'disetujui':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'menunggu':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'ditolak':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h1 className="text-3xl font-bold text-gray-800">Detail Standar Operasional Prosedur (SOP)</h1>
          </div>

          {/* SOP Content */}
          <div className="p-6">
            {sop.length > 0 ? (
              sop.map((item) => (
                <div key={item.id} className="space-y-6">
                  {/* Status Section with Prominent Display */}
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-lg font-semibold">Status:</span>
                    <div className={`px-4 py-2 rounded-full font-bold uppercase ${getStatusColor(item.status)}`}>
                      {item.status || 'Tidak Diketahui'}
                    </div>
                  </div>

                  {/* Grid Layout for Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Judul SOP</label>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                          {item.title || 'Tidak ada judul'}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Divisi</label>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                          {item.division.name || 'Tidak ada nama divisi'}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Deskripsi</label>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 min-h-[100px]">
                          {item.description || 'Tidak ada deskripsi'}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* File SOP */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">File SOP</label>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                          <a
                            href={`/storage/sop/${item.sop?.split('/').pop()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {item.sop ? 'Lihat File PDF' : 'File tidak tersedia'}
                          </a>
                        </div>
                      </div>

                      {/* Flowchart */}
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Flowchart</label>
                        {item.flowchart ? (
                          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                            <img
                              src={`/storage/flowchart/${item.flowchart?.split('/').pop()}`}
                              alt={`Flowchart ${item.title}`}
                              className="w-full h-48 object-cover rounded cursor-pointer"
                              onClick={() => openModal(`/storage/flowchart/${item.flowchart?.split('/').pop()}`)}
                            />
                            <div className="mt-2 text-center">
                              <a
                                href={`/storage/flowchart/${item.flowchart?.split('/').pop()}`}
                                download
                                className="text-blue-600 hover:underline"
                              >
                                Unduh Flowchart
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-gray-500">
                            Flowchart tidak tersedia
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Dibuat Pada</label>
                      <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Tanggal tidak tersedia'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Terakhir Diperbarui</label>
                      <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                        {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'Tanggal tidak tersedia'}
                      </div>
                    </div>
                  </div>

                  {/* Related Divisions */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Divisi Terkait</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.related_divisions && item.related_divisions.length > 0 ? (
                        item.related_divisions.map((div) => (
                          <div 
                            key={div.id} 
                            className="bg-gray-50 p-3 rounded-md border border-gray-200"
                          >
                            {div.name || 'Tidak ada nama divisi'}
                          </div>
                        ))
                      ) : (
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-gray-500">
                          Tidak ada divisi terkait
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                Tidak ada data SOP yang tersedia.
              </div>
            )}
          </div>
          <div>
            {supportedFile.length > 0 ? (
              supportedFile.map((item) => (
                <div key={item.id} className="space-y-6">
                  <h1>{item.name}</h1>
                </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    Tidak ada data tambahan
                  </div>
          )}
          </div>
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-xl max-w-4xl max-h-[90vh]">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Selected" 
              className="max-w-full max-h-[80vh] object-contain" 
            />
          </div>
        </div>
      )}
    </UserLayout>
  );
}