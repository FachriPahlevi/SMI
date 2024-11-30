<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Division;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();

        // Mengambil semua divisi
        $divisions = Division::all();

       // Menentukan posisi untuk setiap divisi berdasarkan id_division
       $positions = [
        1 => [
            "Direktorat Utama", 
            "Direktorat Keuangan & Dukungan Kerja", 
            "Direktorat Bisnis"
        ],
        2 => [
            "Treasury", 
            "Perencanaan & Analisis Keuangan", 
            "Piutang & Permodalan Usaha"
        ],
        3 => [
            "Akuntansi & Keuangan Operasional", 
            "Perpajakan"
        ],
        4 => [
            "Kepatuhan Perusahaan", 
            "Litigasi & Lisensi", 
            "Hukum Bisnis", 
            "Legal Support"
        ],
        5 => [
            "Konsultan Hukum", 
            "Legal Advisor", 
            "Asisten Hukum"
        ],
        6 => [
            "Manajer Risiko", 
            "Staf Kepatuhan", 
            "Supervisor Keamanan"
        ],
        7 => [
            "HRD Manager", 
            "HR Officer", 
            "Talent Acquisition"
        ],
        8 => [
            "F&B Manager", 
            "Cook", 
            "Waiter"
        ],
        9 => [
            "Manajer Multi Service", 
            "Supervisor Layanan", 
            "Staf Layanan"
        ],
        10 => [
            "Transportasi Manager", 
            "Logistik", 
            "Driver"
        ],
        11 => [
            "Facility Manager", 
            "Staf Pemeliharaan", 
            "Supervisor Kebersihan"
        ],
        12 => [
            "Manajer Aset", 
            "Pengelola Aset", 
            "Supervisor Pemeliharaan Aset"
        ],
        13 => [
            "Realty Manager", 
            "Staf Pengelolaan Properti", 
            "Supervisor Realty"
        ]
    ];
    


        // Iterasi setiap divisi
        foreach ($divisions as $division) {
            // Memeriksa apakah posisi untuk divisi ini ada
            if (isset($positions[$division->id])) {
                // Iterasi posisi untuk divisi ini
                foreach ($positions[$division->id] as $position) {
                    // Menambahkan posisi ke tabel 'positions'
                    DB::table('positions')->insert([
                        "id_division" => $division->id,
                        'name' => $position,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }
        }
    }
}
