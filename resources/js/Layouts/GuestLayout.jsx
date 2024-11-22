export default function Guest({ children }) {
    return (
        <div className="min-h-screen grid grid-cols-2 bg-white h-screen">
            <div className='items-center justify-center flex'>
                <div className="w-full border-gray-200 border sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
            <div className='cols-span-2 h-screen bg-blue-900 flex justify-center items-center text-center my-auto font-bold'>
                <div className='text-white'>
                    <h1 className='font-bold text-7xl mb-8'> Selamat Datang</h1>
                    <h1 className='font-light text-3xl'>Standar Operasional Perusahaan (SOP) </h1>
                    <h1 className='font-light text-3xl'>Sinergi Mitra Investama (SMI)</h1>
                </div>
            </div>
            
        </div>
    );
}
