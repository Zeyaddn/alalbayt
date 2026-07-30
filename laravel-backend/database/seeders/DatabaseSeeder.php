<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'عبد القادر محمد محمد عبد الباسط',
            'email' => 'admin@alalbayt-charity.org',
            'password' => Hash::make('admin123'),
        ]);

        User::create([
            'name' => 'مدير الجمعية',
            'email' => 'manager@alalbayt-charity.org',
            'password' => Hash::make('manager123'),
        ]);

        $this->call([
            NewsSeeder::class,
        ]);
    }
}
