// window._ = require('lodash');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    wsHost: window.location.hostname,
    wsPort: 6001,
    // wssPort: 6001,
    // forceTLS: false,
    disableStats: true,
});

window.Echo.channel('DemoPublicChannel').listen('WebSocketDemoPublicEvent', (e) => {
    console.log(e);
});

// listen on 'DemoPrivateChannel' channel for 'WebSocketDemoPrivateEvent' event
// window.Echo.private('DemoPrivateChannel').listen('WebSocketDemoPrivateEvent', (e)=> {
//     console.log(e)
// });

window.Echo.join('DemoPrivateChannel').listen('WebSocketDemoPrivateEvent', (e)=> {
    console.log(e)
});

// class WebSocketDemoPrivateEvent implements ShouldBroadcast
// {
//     use Dispatchable, InteractsWithSockets, SerializesModels;

//     public $someData;

//     /**
//      * Create a new event instance.
//      *
//      * @return void
//      */
//     public function __construct($someData)
//     {
//         $this->someData = $someData;
//     }

//     /**
//      * Get the channels the event should broadcast on.
//      *
//      * @return \Illuminate\Broadcasting\Channel|array
//      */
//     public function broadcastOn()
//     {
//         return new PrivateChannel('DemoPrivateChannel');
//     }
// }
