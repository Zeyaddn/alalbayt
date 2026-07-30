<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title', 'slug', 'summary', 'content', 'image',
        'category', 'author', 'published_at', 'featured', 'views',
    ];

    protected $casts = [
        'published_at' => 'date',
        'featured' => 'boolean',
    ];
}
