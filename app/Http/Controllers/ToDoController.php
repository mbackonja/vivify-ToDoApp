<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use App\Todo;

use Auth;
use Validator;

class ToDoController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Auth::user()->todos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'text'      => 'required',
            'priority'  => 'required|integer|between:1,3'
        ]);

        if ($validator->fails())
            return response()->json($validator->messages(), 400);

        return Auth::user()->todos()->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Auth::user()->todos()->whereId($id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $todo = Auth::user()->todos()->whereId($id);
        if(!$todo)
            return response()->json([], 400);

        if($todo->first()->complete)
            return response()->json(['Task is already completed'], 400);

        if($request->input('type') == 'edit')
        {
            $validator = Validator::make($request->all(), [
                'text'      => 'required',
                'priority'  => 'required|integer|between:1,3'
            ]);

            if ($validator->fails())
                return response()->json($validator->messages(), 400);

            $todo = Auth::user()->todos()->whereId($id);
            return $todo->update([
                'text'      => $request->input('text'),
                'priority'  => $request->input('priority')]);
        }
        elseif ($request->input('type') == 'complete')
        {

            return $todo->update(['complete' => true]);
        }
        else
        {
            return response()->json(['error' => 'Type not supported'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $todo = Auth::user()->todos()->whereId($id);
        return $todo->delete();
    }
}
