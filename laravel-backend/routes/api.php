<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\HelpRequestController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Middleware\ApiTokenAuth;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('news', [NewsController::class, 'index']);
Route::get('news/{slug}', [NewsController::class, 'show']);
Route::get('donations/stats', [DonationController::class, 'stats']);

// Public mutation routes (no auth required for submissions)
Route::post('help-requests', [HelpRequestController::class, 'store']);
Route::post('donations', [DonationController::class, 'store']);

// Auth routes
Route::post('auth/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware(ApiTokenAuth::class)->group(function () {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('auth/me', [AuthController::class, 'me']);

    Route::post('news', [NewsController::class, 'store']);
    Route::put('news/{id}', [NewsController::class, 'update']);
    Route::delete('news/{id}', [NewsController::class, 'destroy']);

    Route::get('help-requests', [HelpRequestController::class, 'index']);
    Route::get('help-requests/{id}', [HelpRequestController::class, 'show']);
    Route::put('help-requests/{id}', [HelpRequestController::class, 'update']);
    Route::delete('help-requests/{id}', [HelpRequestController::class, 'destroy']);

    Route::get('donations', [DonationController::class, 'index']);
    Route::get('donations/{id}', [DonationController::class, 'show']);
    Route::put('donations/{id}', [DonationController::class, 'update']);
    Route::delete('donations/{id}', [DonationController::class, 'destroy']);

    Route::post('upload', [UploadController::class, 'upload']);
    Route::delete('upload', [UploadController::class, 'delete']);
});
