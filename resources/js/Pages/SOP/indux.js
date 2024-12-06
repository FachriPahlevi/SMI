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
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Users,
  Briefcase,
  Award
} from 'lucide-react';

export default function Index({ companyInfo }) {
  const [showFullAbout, setShowFullAbout] = useState(false);

  return (
    <MainLayout>
      <Head title="Dashboard" />
      
      {/* Hero Section - Enhanced with Refined Gradient */}
      <div 
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center" 
        style={{ backgroundImage: "url('/img/banner_home.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-700/60 to-transparent"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in leading-tight drop-shadow-lg">
            PT. Sinergi Mitra Investama
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide opacity-90 animate-fade-in-delay">
            Membangun Masa Depan, Menciptakan Nilai Berkelanjutan
          </p>
        </div>
      </div>

      {/* About Us Section - Improved Readability */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8 border-b-4 border-green-500 pb-4">Tentang Kami</h2>
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className={`${showFullAbout ? 'line-clamp-none' : 'line-clamp-4'} transition-all duration-300`}>
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

      {/* Vision & Mission Section - Enhanced Layout */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center border-b-2 border-green-500 pb-3">
                <Target className="mr-3 text-green-500" /> VISI Perusahaan
              </h2>
              <p className="text-lg text-gray-700 pl-10">{companyInfo.vision}</p>
            </div>
            <div className="row-span-2 mx-auto">
              <img 
                src="img/logo_visi.png" 
                alt="Visi Logo" 
                className="max-h-96 object-contain hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6 flex items-center border-b-2 border-green-500 pb-3">
                <Globe className="mr-3 text-green-500" /> MISI Perusahaan
              </h2>
              <ul className="space-y-4 pl-10">
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
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 border-b-4 border-green-500 pb-4">
            <Users className="inline-block mr-3 text-green-500" /> Struktur Organisasi
          </h2>
          
          <div className="bg-white p-8 rounded-lg shadow-2xl hover:shadow-xl transition-shadow">
            <img 
              src="img/struktur.png" 
              alt="Struktur Organisasi" 
              className="mx-auto max-w-full h-auto object-contain transform hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* Products Section - Enhanced Design */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 border-b-4 border-green-500 pb-4">Produk Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyInfo.products.length > 0 ? (
              companyInfo.products.map((product, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all group"
                >
                  <a
                    href={`/document/${product.name.toLowerCase().replace(/\s+/g, '_')}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-24 mx-auto mb-4 object-contain group-hover:scale-110 transition-transform"
                      title={`Unduh brosur ${product.name}`}
                    />
                    <p className="text-blue-900 font-semibold group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </p>
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">Tidak ada produk tersedia.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer - Refined Design */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-12xl">
          <div className="grid md:grid-cols-3 gap-12 space-y-8 md:space-y-0">
            {/* Company Info */}
            <div className="md:pr-8">
              <img
                src='img/logo/logo_smi.png'
                alt="Company Logo"
                className="mx-auto md:mx-0 mb-4 max-h-20 hover:scale-105 transition-transform"
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
                {[Facebook, Instagram, Twitter, Linkedin].map((IconComponent, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="text-white bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors hover:scale-110"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="md:px-4">
              <h3 className="text-xl font-bold mb-6 pb-3 text-center md:text-left border-b border-white">
                Kontak Kami
              </h3>
              <div className="space-y-4 text-center md:text-left">
                {[
                  { Icon: Eye, text: 'Email: info@sinergi.co.id' },
                  { Icon: Globe, text: 'Telepon: (021) 1234 5678' },
                  { Icon: Target, text: 'Alamat: Jakarta, Indonesia' }
                ].map(({ Icon, text }, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center justify-center md:justify-start">
                    <Icon className="mb-2 md:mb-0 md:mr-3 text-white w-5 h-5" />
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="md:pl-8">
              <h3 className="text-xl font-bold mb-6 pb-3 text-center md:text-left border-b border-white">
                Tautan Cepat
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center md:text-left">
                {[
                  'Beranda', 'Tentang Kami', 'Produk', 
                  'Visi & Misi', 'Kontak', 'Budaya'
                ].map((link, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="text-gray-200 hover:text-white hover:translate-x-2 transition-all"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-12 text-center text-gray-300 border-t border-white/20 pt-6">
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