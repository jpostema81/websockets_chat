import Vue from 'vue';
import Vuex from 'vuex';

// import VueX modules

// front-end
import { MessageStore } from './modules/MessageStore.js';
import { AuthenticationStore } from './modules/AuthenticationStore';


Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        MessageStore,
        AuthenticationStore,
    },
    state: {
        errors: {},
        status: "",
      },
      mutations: {
        setErrors: (state, errors) => {
          state.errors = errors;
        },

        setStatus(state, status) {
          state.status = status;
        },
      },
      getters: {
        getErrors: (state) => {
          return state.errors;
        },
        getStatus: (state) => {
          return state.status;
        },
      },
})
