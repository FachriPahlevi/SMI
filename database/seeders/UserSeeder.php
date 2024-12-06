<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\SOP;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();

        // Daftar role yang bisa digunakan
        $roles = ['superadmin', 'admin', 'user', 'guess'];

        // Membuat 50 user
        for ($i = 1; $i <= 50; $i++) {
            DB::table('users')->insert([
                'name' => 'User ' . $i, // Nama pengguna User 1, User 2, dst.
                'nik' => 'NIK' . str_pad($i, 4, '0', STR_PAD_LEFT), // NIK yang dihasilkan seperti NIK0001, NIK0002, dst.
                'password' => Hash::make("123"), // Password default
                'id_position' => rand(1, 10), // id_position acak antara 1 hingga 10
                'role' => $roles[array_rand($roles)], // Role acak dari array $roles
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
