import MainLayout from '@/Layouts/MainLayout';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
  Eye, 
  Target, 
  Globe, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Users,
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter 
} from 'lucide-react';

export default function Index({ companyInfo }) {
  const [showFullAbout, setShowFullAbout] = useState(false);

  return (
    <MainLayout>
      <Head title="Dashboard" />
      
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center flex items-center justify-center" 
        style={{ backgroundImage: "url('/img/banner_home.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            PT. Sinergi Mitra Investama
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide opacity-90 animate-fade-in-delay">
            Ruang Informasi Standard Operating Procedure (SOP)
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Tentang Kami</h2>
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className={`${showFullAbout ? 'line-clamp-none' : 'line-clamp-4'}`}>
              {companyInfo.about}
            </p>
            {!showFullAbout && (
              <div className="text-center mt-4">
                <button 
                  onClick={() => setShowFullAbout(true)}
                  className="flex items-center mx-auto text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors"
                >
                  Lihat Selengkapnya <ChevronDown className="ml-2" />
                </button>
              </div>
            )}
            {showFullAbout && (
              <>
                <p className="mt-4">{companyInfo.vision}</p>
                <div className="text-center mt-4">
                <button 
                    onClick={() => setShowFullAbout(false)}
                    className="flex items-center mx-auto text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors"
                  >
                    Tutup <ChevronUp className="ml-2" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
                <Target className="mr-3 text-green-500" /> VISI Perusahaan
              </h2>
              <p className="text-lg text-gray-700">{companyInfo.vision}</p>
            </div>
            <div className="row-span-2 mx-auto">
              <img 
                src="img/logo_visi.png" 
                alt="Visi Logo" 
                className="max-h-96 object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
                <Globe className="mr-3 text-green-500" /> MISI Perusahaan
              </h2>
              <ul className="space-y-4">
                {companyInfo.mission.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

       {/* Organizational Structure Section - Simplified with Full Image */}
       <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 pb-4">
            <Users className="inline-block mr-3" /> Struktur Organisasi
          </h2>
          
          <div className="p-8 rounded-lg hover:shadow-xl transition-shadow">
            <img 
              src="img/struktur.png" 
              alt="Struktur Organisasi" 
              className="mx-auto max-w-full h-auto object-contain transform hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Produk Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyInfo.products.length > 0 ? (
              companyInfo.products.map((product, index) => (
                <a
                  key={index}
                  href={`/document/${product.name.toLowerCase().replace(/\s+/g, '_')}.pdf`}
                  className="flex items-center justify-center hover:scale-110 transition-transform rounded-xl hover:bg-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-24 object-contain cursor-pointer"
                    title={`Unduh brosur ${product.name}`}
                  />
                </a>
              ))
            ) : (
              <p className="text-center text-gray-600">Tidak ada produk tersedia.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-2 max-w-12xl">
          <div className="grid md:grid-cols-3 gap-8 space-y-8 md:space-y-0">
            {/* Company Info */}
            <div className="md:pr-8">
              <img
              src='img/logo/logo_smi.png'
              />
              <h3 className="text-2xl font-bold my-auto text-center md:text-left">
                PT. Sinergi Mitra Investama
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6 text-center md:text-left">
                Perusahaan pengelolaan dan pengembang properti yang terpercaya dan profesional, 
                berkomitmen untuk menciptakan nilai berkelanjutan.
              </p>
              {/* Social Media Links */}
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-white bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-white bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-white bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-white bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            {/* Contact Info */}
            <div className="md:px-4">
              <h3 className="text-xl font-bold mb-6 pb-3 text-center md:text-left border-b border-white">
                Kontak Kami
              </h3>
              <div className="space-y-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
                  <Eye className="mb-2 md:mb-0 md:mr-3 text-white w-5 h-5" />
                  <p>Email: info@sinergi.co.id</p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
                  <Globe className="mb-2 md:mb-0 md:mr-3 text-white w-5 h-5" />
                  <p>Telepon: (021) 1234 5678</p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
                  <Target className="mb-2 md:mb-0 md:mr-3 text-white w-5 h-5" />
                  <p>Alamat: Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="md:pl-8">
              <h3 className="text-xl font-bold mb-6 pb-3 text-center md:text-left border-b border-white">
                Tautan Cepat
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center md:text-left">
                <a href="#" className="text-gray-200 hover:text-white transition-colors">Beranda</a>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">Tentang Kami</a>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">Produk</a>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">Visi & Misi</a>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">Kontak</a>
                <a href="#" className="text-gray-200 hover:text-white transition-colors">Budaya</a>
              </div>
            </div>
          </div>
          {/* Copyright */}
          <div className="mt-12 text-center text-gray-300 border-t border-white pt-6">
            <p>© 2024 PT. Sinergi Mitra Investama. All Rights Reserved.</p>
            <p className="text-sm mt-2 text-gray-400">
              Membangun Masa Depan, Menciptakan Nilai Berkelanjutan
            </p>
          </div>
        </div>
      </footer>
    </MainLayout>
  );
}