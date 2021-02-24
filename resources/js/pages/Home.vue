<template>
  <div>
        <button v-if="isAuthenticated" class="btn btn-primary btn-block" @click.prevent="getAuthenticatedUser">
            Get Authenticated User
        </button>

        {{ waring }}
        {{ user }}

        <button v-if="isAuthenticated" class="btn btn-primary btn-block" @click.prevent="startListenToWebsocketsPrivateChannel">
            Start listening to WebSockets private channel
        </button>

        {{ wsData }}
  </div>
</template>

<script>

import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
        waring: '',
        wsData: '',
        user: {},
    };
  },
  computed: {
      ...mapGetters({
        isAuthenticated: "AuthenticationStore/isAuthenticated",
    }),
  },
  methods: {
      getAuthenticatedUser() {
        axios.get("api/user")
            .then(res => {
                this.warning = '';
                this.user = res;
            }).catch((error) => {
                this.warning = 'error user request';
            });
    },
    startListenToWebsocketsPrivateChannel() {
        window.Echo.private('DemoPrivateChannel').listen('WebSocketDemoPrivateEvent', (e)=> {
            this.wsData = e;
        });

        this.wsData = 'listening to WebSockets DemoPrivateChannel';
    },
  },
};
</script>
