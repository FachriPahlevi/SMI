import MainLayout from '@/Layouts/MainLayout';
import React from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
export default function Index (){
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
    return(
        <MainLayout>
            <Head title="Home" />
      
          {/* Hero Section */}
            <div 
            className="relative h-[500px] bg-cover bg-center" 
            style={{ backgroundImage: "url('/img/banner_home.png')" }}

            >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative container mx-auto px-4 h-full flex items-center">
            </div>
            </div>


            {/* Vision & Mission Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-24">
                <div className="grid md:grid-cols-2 gap-12 ">
                    <div className=''>
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">VISI Perusahaan</h2>
                    <p className="text-lg text-gray-700">
                        Menjadi perusahaan pengelolaan dan pengembang properti yang terpercaya
                        dan profesional
                    </p>
                    </div>
                    <div className='row-span-2 mx-auto my-auto '>
                        <img src="img/logo_visi.png"></img>
                    </div>
                    <div className=''>
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">MISI Perusahaan</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Mengembangkan usaha pengelolaan aset investasi dengan tetap memperhatikan tata kelola perusahaan yang baik</span>
                        </li>
                        <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Memberikan kontribusi positif terhadap lingkungan</span>
                        </li>
                        <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Meningkatkan kualitas SDM dan organisasi agar mampu memberikan nilai tambah bagi pemangku kepentingan</span>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Budaya AKHLAK</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {coreValues.map((value, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                        <div className="text-3xl font-bold text-blue-900 mb-2">{value.letter}</div>
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Produk Kami</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-center">
                        <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-24 object-contain"
                        />
                    </div>
                    ))}
                </div>
                </div>
            </section>
        </MainLayout>
    )
}
