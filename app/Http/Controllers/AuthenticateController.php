<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthenticateController extends Controller
{

    public function store(Request $request)
    {
        $all = $request->json()->all();

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($all)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }
}
