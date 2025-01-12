<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/home');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::post('/store', [HomeController::class, 'store'])->name('store');

Route::get('/api/province/{id}/cities', [HomeController::class, 'getCities']);
Route::post('/api/cities', [HomeController::class, 'searchCities']);