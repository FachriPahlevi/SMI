<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormApplication extends Model
{
    use HasFactory;

    protected $table = 'forms';
    protected $guarded = [];
}
