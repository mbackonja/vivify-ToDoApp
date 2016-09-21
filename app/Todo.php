<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = ['text', 'priority'];
    protected $table = 'todo';

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
