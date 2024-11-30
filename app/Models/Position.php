<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Division;

class Position extends Model
{
    use HasFactory; 
    protected $table = 'positions';
    protected $guarded = [];

    public function division(){
        return $this->belongsTo(Division::class, 'id_division');
    }

    public function user(){
        return $this->hasMany(User::class, 'id');
    }

}
