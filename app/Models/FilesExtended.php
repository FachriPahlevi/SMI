<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilesExtended extends Model
{
    use HasFactory;
    protected $table = 'files_extended';
    protected $fillable = [
        'id_sop',
        'name',
        'file_path'
    ];
}
