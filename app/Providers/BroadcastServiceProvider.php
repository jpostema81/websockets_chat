<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes();
        // In order to use our API routes with broadcasting routes. We must first update our BroadcastServiceProvider to use "auth:api" instead of "web".
        // Broadcast::routes(["middleware" => ["auth:api"]]);
        // https://stackoverflow.com/questions/46438199/how-can-i-separate-broadcasting-routes-authorization-middleware-in-laravel

        require base_path('routes/channels.php');
    }
}
