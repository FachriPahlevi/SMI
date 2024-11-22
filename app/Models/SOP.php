<?php

namespace App\Models;

use App\Models\Division;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SOP extends Model
{
    use HasFactory;

    protected $table = 'sop';
    protected $guarded = [];

    public function division() {
        return $this->hasMany(Division::class, 'id');
    }
    
    public function user() {
        return $this->belongsTo(User::class, 'created_by');
    }
    
}
