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
  Twitter 
} from 'lucide-react';

export default function Index() {
  const [showFullAbout, setShowFullAbout] = useState(false);

  const products = [
    { id: 1, image: '/img/logo/logo_sig.png', name: 'SIG' },
    { id: 2, image: '/img/logo/logo_gobeyond.png', name: 'Go Beyond Next' },
    { id: 3, image: '/img/logo/logo_sigreat.png', name: 'SIG Real' },
    { id: 4, image: '/img/logo/logo_sicar.png', name: 'SICAR' },
    { id: 5, image: '/img/logo/logo_signaturelounge.png', name: 'SIGNATURE Lounge' },
    { id: 6, image: '/img/logo/logo_asetmanajemen.png', name: 'Asset Management' },
    { id: 7, image: '/img/logo/logo_sigap.png', name: 'SIGAP' },
    { id: 8, image: '/img/logo/logo_dapurkilen.png', name: 'Dapur Kilen' },
    { id: 9, image: '/img/logo/logo_kopikilen.png', name: 'Kopi Kilen' },
    { id: 10, image: '/img/logo/logo_sinergiland.png', name: 'SINERGI Land' },
    { id: 11, image: '/img/logo/logo_sinergigriya.png', name: 'SINERGI Griya' },
  ];
  
  const coreValues = [
    { letter: 'A', title: 'Amanah', description: 'Menerapkan teguh kepercayaan yang diberikan' },
    { letter: 'K', title: 'Kompeten', description: 'Terus belajar dan mengembangkan kemampuan' },
    { letter: 'H', title: 'Harmonis', description: 'Saling peduli dan menghargai perbedaan' },
    { letter: 'L', title: 'Loyal', description: 'Berdedikasi dan mengutamakan kepentingan' },
    { letter: 'A', title: 'Adaptif', description: 'Terus berinovasi dan antusias dalam menghadapkan perubahan' },
    { letter: 'K', title: 'Kolaboratif', description: 'Membangun kerja sama yang sinergis' },
  ];

  return (
    <MainLayout>
      <Head title="Home" />
      
      {/* Hero Section with Overlay and Centered Content */}
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

      {/* About Us Section with Show More */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Tentang Kami</h2>
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className={`${showFullAbout ? 'line-clamp-none' : 'line-clamp-4'}`}>
              PT Sinergi Mitra Investama adalah perusahaan profesional yang fokus pada pengelolaan 
              dan pengembangan properti. Kami berkomitmen untuk memberikan solusi investasi berkualitas 
              dengan memperhatikan tata kelola perusahaan yang baik, kontribusi positif lingkungan, 
              dan pengembangan sumber daya manusia.
            </p>
            {!showFullAbout && (
              <div className="text-center mt-4">
                <button 
                  onClick={() => setShowFullAbout(true)}
                  className="flex items-center mx-auto text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Lihat Selengkapnya <ChevronDown className="ml-2" />
                </button>
              </div>
            )}
            {showFullAbout && (
              <>
                <p className="mt-4">
                  Dengan visi menjadi perusahaan pengelolaan properti terpercaya, kami terus 
                  mengembangkan strategi dan inovasi untuk menciptakan nilai tambah bagi para pemangku 
                  kepentingan. Kami percaya bahwa keberhasilan kami tergantung pada kemampuan kami untuk 
                  beradaptasi, berinovasi, dan membangun hubungan yang kuat.
                </p>
                <p><a href='/document/compro.pdf'>compro</a></p>
                <p><a href='/document/dapur_kilen.pdf'>dapur kilen</a></p>
                <div className="text-center mt-4">
                  <button 
                    onClick={() => setShowFullAbout(false)}
                    className="flex items-center mx-auto text-blue-600 hover:text-blue-800 transition-colors"
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
              <p className="text-lg text-gray-700">
                Menjadi perusahaan pengelolaan dan pengembang properti yang terpercaya dan profesional
              </p>
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
                <li className="flex items-start">
                  <Star className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>Mengembangkan usaha pengelolaan aset investasi dengan tetap memperhatikan tata kelola perusahaan yang baik</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>Memberikan kontribusi positif terhadap lingkungan</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>Meningkatkan kualitas SDM dan organisasi agar mampu memberikan nilai tambah bagi pemangku kepentingan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Budaya AKHLAK</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl font-bold text-blue-900 mb-3">{value.letter}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Produk Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="flex items-center justify-center hover:scale-110 transition-transform"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-24 object-contain"
                  title={product.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PT. Sinergi Mitra Investama</h3>
              <p className="text-gray-300">
                Perusahaan pengelolaan dan pengembang properti yang terpercaya dan profesional
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Kontak Kami</h3>
              <p>Email: info@sinergi.co.id</p>
              <p>Telepon: (021) 1234 5678</p>
              <p>Alamat: Jakarta, Indonesia</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Ikuti Kami</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-300 transition-colors">
                  <Facebook />
                </a>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  <Instagram />
                </a>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  <Twitter />
                </a>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 border-t border-blue-700 pt-4">
            © 2024 PT. Sinergi Mitra Investama. All Rights Reserved.
          </div>
        </div>
      </footer>
    </MainLayout>
  );
}