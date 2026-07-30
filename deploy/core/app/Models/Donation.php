<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    protected $fillable = [
        'donor_name', 'phone', 'amount', 'method',
        'transaction_id', 'notes', 'donated_at',
    ];

    protected $casts = [
        'donated_at' => 'datetime',
        'amount' => 'decimal:2',
    ];
}
