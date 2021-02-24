<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Private and presence broadcast channels authenticate the current user via your application's
// default authentication guard. If the user is not authenticated, channel authorization is automatically
// denied and the authorization callback is never executed. However, you may assign multiple,
// custom guards that should authenticate the incoming request if necessary.

// Any visitor to your application may subscribe to a public channel without any authentication or authorization;
// however, in order to subscribe to a private channel, a user must be authenticated and authorized to listen on
// that channel.

Broadcast::channel('DemoPrivateChannel', function ($user, $id) {
    return true;
    // return (int) $user->id === (int) $id;
});
