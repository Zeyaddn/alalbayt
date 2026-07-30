<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HelpRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HelpRequestController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = HelpRequest::latest();

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->type) {
            $query->where('type', $request->type);
        }

        return response()->json($query->paginate($request->per_page ?? 20));
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(HelpRequest::findOrFail($id));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'type' => 'nullable|in:مالي,غذائي,طبي,تعليمي,إيجار,أخرى',
            'description' => 'required|string',
            'amount' => 'nullable|numeric|min:0',
            'address' => 'nullable|string',
        ]);

        $request = HelpRequest::create($data);

        return response()->json($request, 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $helpRequest = HelpRequest::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
            'email' => 'nullable|email',
            'type' => 'nullable|in:مالي,غذائي,طبي,تعليمي,إيجار,أخرى',
            'description' => 'sometimes|string',
            'amount' => 'nullable|numeric|min:0',
            'address' => 'nullable|string',
            'status' => 'nullable|in:قيد_المراجعة,تمت_الموافقة,تم_الصرف,مرفوض',
            'notes' => 'nullable|string',
        ]);

        $helpRequest->update($data);

        return response()->json($helpRequest);
    }

    public function destroy(string $id): JsonResponse
    {
        HelpRequest::findOrFail($id)->delete();
        return response()->json(['message' => 'تم حذف الطلب']);
    }
}
