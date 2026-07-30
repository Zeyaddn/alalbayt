<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Donation::latest();

        if ($request->method) {
            $query->where('method', $request->method);
        }

        return response()->json($query->paginate($request->per_page ?? 20));
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(Donation::findOrFail($id));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'donor_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'amount' => 'required|numeric|min:0.01',
            'method' => 'nullable|in:تحويل_بنكي,فودافون_كاش,انستا_باى,نقدي',
            'transaction_id' => 'nullable|string|unique:donations',
            'notes' => 'nullable|string',
        ]);

        $donation = Donation::create($data);

        return response()->json($donation, 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $donation = Donation::findOrFail($id);

        $data = $request->validate([
            'donor_name' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'amount' => 'sometimes|numeric|min:0.01',
            'method' => 'nullable|in:تحويل_بنكي,فودافون_كاش,انستا_باى,نقدي',
            'transaction_id' => 'nullable|string|unique:donations,transaction_id,' . $id,
            'notes' => 'nullable|string',
        ]);

        $donation->update($data);

        return response()->json($donation);
    }

    public function destroy(string $id): JsonResponse
    {
        Donation::findOrFail($id)->delete();
        return response()->json(['message' => 'تم حذف التبرع']);
    }

    public function stats(): JsonResponse
    {
        return response()->json([
            'total_donations' => Donation::sum('amount'),
            'total_count' => Donation::count(),
            'by_method' => Donation::selectRaw('method, sum(amount) as total, count(*) as count')
                ->groupBy('method')->get(),
        ]);
    }
}
