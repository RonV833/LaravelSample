<?php

use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/addproduct', [ProductController::class, 'create']);
Route::get('/editproduct/{id}', [ProductController::class, 'edit']);
Route::put('/updateproduct/{id}', [ProductController::class, 'update']);
Route::get('products', [ProductController::class, 'index']);
Route::delete('/deleteproduct/{id}', [ProductController::class, 'delete']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
