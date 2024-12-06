<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SOPController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\NotificationController;

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



// Rute yang berlaku untuk semua role (superadmin, admin, user)
Route::middleware(['auth'])->group(function () {
    Route::get('/', [IndexController::class, 'index'])->name('index');
    Route::get('/daftar-divisi', [DivisionController::class, 'index'])->name('divisi.index');
    Route::get('/daftar-sop/{id}', [SOPController::class, 'index'])->name('sop');
    Route::get('/cek-sop/{id}', [SOPController::class, 'show'])->name('sop.show');
    Route::get('/panduan', function () {
        return Inertia::render('Panduan');
    });
});

// Rute khusus untuk superadmin
Route::middleware(['auth', 'role:superadmin'])->group(function () {
    Route::get('/manajemen-user', [UserController::class, 'index'])->name('user');
    Route::get('/tambah-sop', [SOPController::class, 'create'])->name('sop.create');
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/edit-sop/{id}', [SOPController::class, 'edit'])->name('sop.edit');
    Route::post('/tambah-sops', [SOPController::class, 'store'])->name('sop.store');
    Route::post('/tambah-user', [UserController::class, 'store'])->name('user.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('user.update');
    Route::post('/api/notifications/{id}/mark-as-read', [NotificationController::class, 'store']);
    Route::put('/sop/{sop}', [SOPController::class, 'update'])->name('sop.update');
    Route::delete('/sop/delete/{id}', [SOPController::class, 'destroy'])->name('sop.destroy');
});

// Rute khusus untuk admin
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/tambah-sop', [SOPController::class, 'create'])->name('sop.create');
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/edit-sop/{id}', [SOPController::class, 'edit'])->name('sop.edit');
    Route::post('/tambah-sops', [SOPController::class, 'store'])->name('sop.store');
    Route::post('/api/notifications/{id}/mark-as-read', [NotificationController::class, 'store']);
    Route::put('/sop/{sop}', [SOPController::class, 'update'])->name('sop.update');
    Route::delete('/sop/delete/{id}', [SOPController::class, 'destroy'])->name('sop.destroy');
});

// Rute khusus untuk admin
Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/tambah-sop', [SOPController::class, 'create'])->name('sop.create');
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/tambah-sops', [SOPController::class, 'store'])->name('sop.store');
    Route::post('/api/notifications/{id}/mark-as-read', [NotificationController::class, 'store']);
    Route::put('/sop/{sop}', [SOPController::class, 'update'])->name('sop.update');
});

// Rute khusus untuk admin
Route::middleware(['auth', 'role:guess'])->group(function () {
    Route::get('/', [IndexController::class, 'index'])->name('index');
    Route::get('/daftar-divisi', [DivisionController::class, 'index'])->name('divisi.index');
    Route::get('/daftar-sop/{id}', [SOPController::class, 'index'])->name('sop');
    Route::get('/cek-sop/{id}', [SOPController::class, 'show'])->name('sop.show');
    Route::get('/panduan', function () {
        return Inertia::render('Panduan');
    });
});


require __DIR__.'/auth.php';
