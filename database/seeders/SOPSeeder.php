<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\SOP;
use Illuminate\Support\Facades\DB;
class SOPSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Ambil 5 divisi yang sudah ada
        $divisions = \App\Models\Division::all();
    
        // Ambil seluruh user dan acak urutannya
        $users = User::all()->shuffle();
    
        // Total SOP yang akan dibuat
        $totalSop = 70;
    
        // Hitung berapa SOP per divisi (membagi 70 menjadi 5 divisi)
        $sopPerDivision = $totalSop / $divisions->count();
    
        // Indeks untuk menentukan user yang digunakan untuk created_by
        $userIndex = 0;
    
        foreach ($divisions as $division) {
            for ($i = 1; $i <= $sopPerDivision; $i++) {
                // Ambil user yang teracak berdasarkan indeks
                $user = $users[$userIndex];
    
                // Buat SOP
                sop::create([
                    'id_division' => $division->id,
                    'title' => 'SOP Title ' . ($i + (($division->id - 1) * $sopPerDivision)) . ' for ' . $division->name,
                    'Description' => 'Description for SOP ' . ($i + (($division->id - 1) * $sopPerDivision)) . ' in ' . $division->name,
                    'status' => 'menunggu', // status default
                    'created_by' => $user->id,
                ]);
    
                // Update indeks user
                $userIndex++;
    
                // Jika sudah mencapai pengguna terakhir, reset indeks ke 0 untuk acak ulang
                if ($userIndex == count($users)) {
                    $userIndex = 0;
                }
            }
        }
    }
    
}
