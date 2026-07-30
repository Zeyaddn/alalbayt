<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = News::latest();

        if ($request->category) {
            $query->where('category', $request->category);
        }

        if ($request->featured) {
            $query->where('featured', true);
        }

        $news = $query->paginate($request->per_page ?? 12);

        return response()->json($news);
    }

    public function show(string $slug): JsonResponse
    {
        $item = News::where('slug', $slug)->firstOrFail();
        $item->increment('views');
        return response()->json($item);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'category' => 'nullable|string',
            'author' => 'nullable|string',
            'published_at' => 'nullable|date',
            'featured' => 'nullable|boolean',
        ]);

        $data['slug'] = Str::slug($request->title);
        $data['author'] ??= 'إدارة الجمعية';

        $news = News::create($data);

        return response()->json($news, 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $news = News::findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'summary' => 'nullable|string',
            'content' => 'sometimes|string',
            'image' => 'nullable|string',
            'category' => 'nullable|string',
            'author' => 'nullable|string',
            'published_at' => 'nullable|date',
            'featured' => 'nullable|boolean',
        ]);

        if ($request->has('title')) {
            $data['slug'] = Str::slug($request->title);
        }

        $news->update($data);

        return response()->json($news);
    }

    public function destroy(string $id): JsonResponse
    {
        News::findOrFail($id)->delete();
        return response()->json(['message' => 'تم حذف الخبر']);
    }
}
