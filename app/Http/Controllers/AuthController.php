<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use App\Http\Requests\Auth\Login;
use App\User;

// https://jwt-auth.readthedocs.io/en/docs/quick-start/


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login', 'register']]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserByToken()
    {
        return response()->json(new UserResource($this->guard()->user()), 200);
    }

    public function login(Login $request)
    {
        $validatedInput = $request->validated();

        if(Auth::attempt($request->only(['email', 'password'])))
        {
            $user = $this->guard()->user();

            return response([
                "success" => true,
                "user" => $user,
            ], 200);
        }
        else
        {
            return response(["success" => false], 403);
        }
    }

    public function logout()
    {
        $this->guard()->logout();
        return response()->json(['message' => 'Je bent nu uitgelogd']);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard('sanctum');
    }
}
