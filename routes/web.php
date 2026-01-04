<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::match(['get', 'post'], '/', [UserController::class, 'login'])->name('login');  //login Route
Route::match(['get', 'post'], '/register', [UserController::class, 'create'])->name('register');  //Registration Route
Route::match(['get', 'post'], '/dashboard', [UserController::class, 'dashboard'])->name('dashboard');    //route for dashboard
Route::match(['get', 'post'], '/update', [UserController::class, 'update'])->name('update');  //update Route
Route::get('/delete/{id?}', [UserController::class, 'delete'])->name('delete'); //route for delete
Route::post('/old', [UserController::class, 'old'])->name('old'); //route for update by a ajax
Route::match(['get', 'post'], '/show_update/{id?}', [UserController::class, 'show_update'])->name('show_update'); //route for update by a ajax
Route::match(['get', 'post'], '/address/{id?}', [UserController::class, 'address'])->name('address');
Route::match(['get', 'post'], '/view/{id?}', [UserController::class, 'view'])->name('view');
Route::post('/store', [UserController::class, 'store'])->name('store');

Route::match(['get', 'post'], '/country', [UserController::class, "country"])->name('country');
Route::match(['get', 'post'], '/state/{id?}', [UserController::class, "state"])->name('state');
Route::match(['get', 'post'], '/city/{id?}', [UserController::class, "city"])->name('city');
