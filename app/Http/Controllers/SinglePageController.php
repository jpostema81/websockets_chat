<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\WebSocketDemoPublicEvent;
use App\Events\WebSocketDemoPrivateEvent;


class SinglePageController extends Controller
{
    public function index() {
        return view('app');
    }

    public function wstest() {
        broadcast(new WebSocketDemoPublicEvent('wstest public'));

        broadcast(new WebSocketDemoPrivateEvent('wstest private'));

        broadcast(new WebSocketDemoPrivateEvent(auth()->user(), $message))->toOthers();
    }
}
