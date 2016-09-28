<?php

namespace App\Http\Middleware;

use JWTAuth;
use Closure;

class RefreshJWTToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $token = JWTAuth::getToken();
        $newToken = JWTAuth::refresh($token);

        return $response->header('NewToken', $newToken);
    }
}
