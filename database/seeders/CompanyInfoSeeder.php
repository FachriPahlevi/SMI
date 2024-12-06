<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CompanyInfoSeeder extends Seeder
{
    public function run()
    {
        DB::table('company_infos')->insert([
            'about' => 'PT Sinergi Mitra Investama adalah perusahaan profesional yang fokus pada pengelolaan dan pengembangan properti...',
            'vision' => 'Menjadi perusahaan pengelolaan dan pengembang properti yang terpercaya dan profesional',
            'mission' => json_encode([
                'Mengembangkan usaha pengelolaan aset investasi dengan tetap memperhatikan tata kelola perusahaan yang baik',
                'Memberikan kontribusi positif terhadap lingkungan',
                'Meningkatkan kualitas SDM dan organisasi agar mampu memberikan nilai tambah bagi pemangku kepentingan',
            ]),
            'products' => json_encode([
                ['name' => 'SIG', 'image' => '/img/logo/logo_sig.png'],
                ['name' => 'Go Beyond Next', 'image' => '/img/logo/logo_gobeyond.png'],
                ['name' => 'SIG Real', 'image' => '/img/logo/logo_sigreat.png'],
                ['name' => 'SICAR', 'image' => '/img/logo/logo_sicar.png'],
                ['name' => 'SIGNATURE Lounge', 'image' => '/img/logo/logo_signaturelounge.png'],
                ['name' => 'Asset Management', 'image' => '/img/logo/logo_asetmanajemen.png'],
                ['name' => 'SIGAP', 'image' => '/img/logo/logo_sigap.png'],
                ['name' => 'Dapur Kilen', 'image' => '/img/logo/logo_dapurkilen.png'],
                ['name' => 'Kopi Kilen', 'image' => '/img/logo/logo_kopikilen.png'],
                ['name' => 'SINERGI Land', 'image' => '/img/logo/logo_sinergiland.png'],
                ['name' => 'SINERGI Griya', 'image' => '/img/logo/logo_sinergigriya.png'],
            ]),
        ]);
    }
}