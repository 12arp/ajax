<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    protected $table = 'useraddress';


    protected $fillable = [
        'address1',
        'address2',
        'city',
        'state',
        'zipcode',
        'country',
        'user_id',
        'paddress1',
        'paddress2',
        'pcity',
        'pstate',
        'ischecked',
        'pzipcode',
        'pcountry'


    ];

    public function user(): BelongsTo
    {

        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
