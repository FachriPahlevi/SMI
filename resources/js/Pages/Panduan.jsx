import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";


export default function Panduan() {
    return (
        <MainLayout>
            <Head title="Panduan" />
            <div className="mt-12">
                {/* Title Section */}
                <div className="title text-3xl font-bold flex justify-center mb-8">
                    <h1>Panduan Penggunaan Website SOP</h1>
                </div>

                {/* Content Section */}
                <div className="content grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Panduan Upload SOP */}
                    <div className="p-8 border rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Panduan Upload SOP atau Flowchart</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>
                                <strong>Login ke Website:</strong> Masukkan username dan password Anda di halaman login, lalu klik tombol "Login".
                            </li>
                            <li>
                                <strong>Navigasi ke Dashboard:</strong> Pilih menu "Upload SOP" atau "Flowchart" sesuai kebutuhan. Anda akan diarahkan ke form upload.
                            </li>
                            <li>
                                <strong>Isi Form:</strong>
                                <ul className="list-disc list-inside ml-6 space-y-1">
                                    <li>Masukkan Nama Divisi.</li>
                                    <li>Masukkan nama file.</li>
                                    <li>Klik tombol "Choose File" untuk memilih file SOP (PDF) atau Flowchart (PNG/PDF).</li>
                                    <li>Unggah form pendukung jika diperlukan.</li>
                                    <li>Pilih kategori Divisi lain yang relevan (misal: Finance, Hukum, SDM, dll.).</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Upload File:</strong> Klik tombol "Upload" dan tunggu hingga proses unggah selesai.
                            </li>
                            <li>
                                <strong>Cek Daftar SOP:</strong> File yang berhasil diunggah akan muncul di daftar SOP.
                            </li>
                        </ol>
                    </div>

                    {/* Panduan Unduh SOP */}
                    <div className="p-8 border rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Panduan Unduh SOP atau Flowchart</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>
                                <strong>Login ke Akun:</strong> Masukkan username dan password Anda di halaman login, lalu klik tombol "Login".
                            </li>
                            <li>
                                <strong>Akses Halaman SOP atau Flowchart:</strong> Klik menu "Daftar SOP" atau "Daftar Flowchart" pada navigasi utama. Gunakan fitur pencarian atau kategori untuk menemukan file.
                            </li>
                            <li>
                                <strong>Pilih SOP atau Flowchart:</strong> Klik pada judul SOP atau Flowchart yang relevan untuk membuka detailnya.
                            </li>
                            <li>
                                <strong>Unduh File:</strong> Pada halaman detail, klik tombol "Unduh" untuk mengunduh file ke perangkat Anda.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
