<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    $now = Carbon::now();

    DB::table('divisions')->insert([
        [
            'name' => "Direktorat Utama",
            'created_at' => $now,
            'updated_at' => $now,
        ],
        [
            'name' => "Corporate Finance",
            'created_at' => $now,
            'updated_at' => $now,
        ],
        [
            'name' => "Akuntansi & Pajak",
            'created_at' => $now,
            'updated_at' => $now,
        ],
        [
            'name' => "Hukum Tata Kelola",
            'created_at' => $now,
            'updated_at' => $now,
        ],
        [
            'name' => "Risiko dan Kepatuhan",
            'created_at' => $now,
            'updated_at' => $now,
        ],
    ]);
}

    }
