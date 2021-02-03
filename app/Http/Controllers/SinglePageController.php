<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\WebSocketDemoEvent;

class SinglePageController extends Controller
{
    public function index() {
        return view('app');
    }

    public function wstest() {
        broadcast(new WebSocketDemoEvent('wstest'));
    }
}
