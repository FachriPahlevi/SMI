<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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

        // Nama posisi yang akan digunakan
        $positions = [
            'Manager', 'Staff', 'Supervisor', 'Coordinator', 'Assistant', 'Lead', 'Director', 'Secretary', 'HR', 'Engineer'
        ];

        // Membuat 30 posisi di 5 divisi
        $divisions = [1, 2, 3, 4, 5]; // Divisi ID

        foreach ($divisions as $divisionId) {
            foreach ($positions as $position) {
                DB::table('positions')->insert([
                    "id_division" => $divisionId,
                    'name' => $position,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
