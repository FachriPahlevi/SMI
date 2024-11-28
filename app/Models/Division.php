<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;
use App\Models\Position;
use App\Models\SOP;

class Division extends Model
{
    use HasFactory;
    protected $table = 'divisions';
    protected $guarded = [];

    public function sop()
{
    return $this->hasMany(SOP::class, 'id_division', 'id');
}

// 
public function position()
{
    return $this->hasMany(Position::class, 'id_division');
}

public function user()
{
    return $this->hasMany(User::class, 'id');
}

}
