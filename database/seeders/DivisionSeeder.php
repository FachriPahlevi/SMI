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

        $divisions = [
            "BOD",
            "Corporate Finance",
            "Akuntansi & Pajak",
            "Hukum",
            "Risiko dan Kepatuhan",
            "SDM",
            "F&B",
            "Multi Service",
            "Transportasi",
            "Facility Management",
            "Asset Management",
            "Realty",
        ];

        $data = array_map(function ($division) use ($now) {
            return [
                'name' => $division,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }, $divisions);

        DB::table('divisions')->insert($data);
    }
}
