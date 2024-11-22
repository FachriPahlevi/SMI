<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SOPController;
use App\Http\Controllers\DivisionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [IndexController::class, 'index'])->name('index');
Route::get('/manajemen-user', [UserController::class, 'index'])->name('user');
Route::get('/daftar-divisi', [DivisionController::class, 'index'])->name('divisi');
Route::get('/daftar-sop/{id}', [SOPController::class, 'index'])->name('sop');
Route::get('/tambah-sop', [SOPController::class, 'create'])->name('sop.create');
Route::get('/cek-sop/{id}', [SOPController::class, 'show'])->name('sop.show');

Route::get('/edit-sop/{id}', [SOPController::class, 'edit'])->name('sop.edit');


Route::get('/panduan', function () {
    return Inertia::render('Panduan');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
