<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //
    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'dob',
        'phone',
        'gender',
        'image'
    ];

    public function addresses()
    {
        return $this->hasMany(Address::class, 'user_id', 'id');
    }

   
}
