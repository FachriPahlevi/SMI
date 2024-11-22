<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory; 
    protected $table = 'positions';
    protected $guarded = [];

    public function Division(){
        return $this->belongsTo(Division::class, 'id_division');
    }
}
