<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('notifications')->insert([
            [
                'id_division' => 1, // Pastikan ada data di tabel divisions dengan ID ini
                'message' => 'Meeting scheduled for Monday at 10 AM.',
                'status' => 'unread',
                'id_sop' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_division' => 2,
                'message' => 'System maintenance will occur this weekend.',
                'status' => 'read',
                'id_sop' => '2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_division' => 1,
                'message' => 'Don’t forget to submit your monthly report.',
                'status' => 'unread',
                'id_sop' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
    
}
