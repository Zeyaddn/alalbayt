<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function upload(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|image|mimes:jpg,jpeg,png,webp,gif|max:10240',
        ]);

        $file = $request->file('file');
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $slug = Str::slug($originalName);

        $webpPath = $this->convertToWebp($file, $slug);
        $thumbPath = $this->generateThumbnail($file, $slug);

        if ($request->filled('old_url')) {
            $this->deleteOldFiles($request->input('old_url'));
        }

        return response()->json([
            'url' => url(Storage::url($webpPath)),
            'path' => $webpPath,
            'thumbnail_url' => url(Storage::url($thumbPath)),
            'thumbnail_path' => $thumbPath,
        ], 201);
    }

    public function delete(Request $request): JsonResponse
    {
        $request->validate(['path' => 'required|string']);

        if (Storage::disk('public')->exists($request->path)) {
            Storage::disk('public')->delete($request->path);
        }

        $this->deleteThumbnailFor($request->path);

        return response()->json(['message' => 'تم حذف الملف']);
    }

    private function convertToWebp(UploadedFile $file, string $slug): string
    {
        $source = $this->createImageResource($file);
        if (!$source) {
            $path = $file->store('uploads', 'public');
            return $path;
        }

        $origW = imagesx($source);
        $origH = imagesy($source);
        $maxW = 1600;
        $maxH = 1600;

        if ($origW > $maxW || $origH > $maxH) {
            $ratio = min($maxW / $origW, $maxH / $origH);
            $newW = (int)round($origW * $ratio);
            $newH = (int)round($origH * $ratio);
            $canvas = imagecreatetruecolor($newW, $newH);
            imagecopyresampled($canvas, $source, 0, 0, 0, 0, $newW, $newH, $origW, $origH);
            imagedestroy($source);
            $source = $canvas;
        }

        $filename = $slug . '-' . Str::random(8) . '.webp';
        $path = 'uploads/' . $filename;
        $fullPath = Storage::disk('public')->path($path);

        $dir = dirname($fullPath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        imagewebp($source, $fullPath, 80);
        imagedestroy($source);

        return $path;
    }

    private function generateThumbnail(UploadedFile $file, string $slug): string
    {
        $source = $this->createImageResource($file);
        if (!$source) {
            return '';
        }

        $origW = imagesx($source);
        $origH = imagesy($source);
        $thumbW = 400;
        $thumbH = (int)round($origH * ($thumbW / $origW));

        $canvas = imagecreatetruecolor($thumbW, $thumbH);
        imagecopyresampled($canvas, $source, 0, 0, 0, 0, $thumbW, $thumbH, $origW, $origH);
        imagedestroy($source);

        $filename = $slug . '-' . Str::random(8) . '-thumb.webp';
        $path = 'uploads/thumbnails/' . $filename;
        $fullPath = Storage::disk('public')->path($path);

        $dir = dirname($fullPath);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }

        imagewebp($canvas, $fullPath, 75);
        imagedestroy($canvas);

        return $path;
    }

    private function createImageResource(UploadedFile $file): ?\GdImage
    {
        $mime = $file->getMimeType();
        $realPath = $file->getRealPath();

        return match ($mime) {
            'image/jpeg', 'image/jpg' => @imagecreatefromjpeg($realPath) ?: null,
            'image/png' => @imagecreatefrompng($realPath) ?: null,
            'image/webp' => @imagecreatefromwebp($realPath) ?: null,
            'image/gif' => @imagecreatefromgif($realPath) ?: null,
            default => null,
        };
    }

    private function deleteOldFiles(string $oldUrl): void
    {
        $baseUrl = rtrim(config('app.url'), '/') . '/storage/';
        $relativePath = str_replace($baseUrl, '', $oldUrl);

        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }

        $this->deleteThumbnailFor($relativePath);
    }

    private function deleteThumbnailFor(string $path): void
    {
        $filename = basename($path);
        $thumbDir = 'uploads/thumbnails/';
        $thumbPattern = $thumbDir . str_replace('.webp', '', $filename) . '-thumb.webp';

        $files = Storage::disk('public')->files('uploads/thumbnails');
        $baseName = str_replace('.webp', '', $filename);
        foreach ($files as $f) {
            if (str_starts_with(basename($f), $baseName)) {
                Storage::disk('public')->delete($f);
            }
        }
    }
}
