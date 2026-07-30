<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HelpRequest extends Model
{
    protected $table = 'help_requests';

    protected $fillable = [
        'name', 'phone', 'email', 'type', 'description',
        'amount', 'address', 'status', 'notes',
    ];
}
