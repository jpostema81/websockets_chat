<template>
  <div class="login-container">
    <h1 class="text-center mb-5">Login</h1>
    <!-- Hide the form if user is already logged in -->
    <form @submit.prevent="handleSubmit" v-if="!isAuthenticated">
      <div class="form-group">
        <label for="username" class="sr-only">Emailadres</label>
        <input
          id="username"
          placeholder="E-mailadres"
          type="text"
          v-model="email"
          required
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.hasOwnProperty('email') }"
        />
        <div
          v-if="submitted && errors.hasOwnProperty('email')"
          class="invalid-feedback"
        >
          {{ errors.email.join(" ") }}
        </div>
      </div>

      <div class="form-group">
        <label for="password" class="sr-only">Wachtwoord</label>
        <input
          id="password"
          placeholder="Wachtwoord"
          type="password"
          v-model="password"
          required
          name="password"
          class="form-control"
          :class="{
            'is-invalid': submitted && errors.hasOwnProperty('password'),
          }"
        />
        <div
          v-if="submitted && errors.hasOwnProperty('password')"
          class="invalid-feedback"
        >
          {{ errors.password.join(" ") }}
        </div>
      </div>

      <div class="form-group">
        <button
          class="btn btn-primary btn-block"
          :disabled="status === 'fetching'"
        >
          Login
        </button>
        <img
          v-show="status === 'fetching'"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
        <router-link to="/register" class="btn btn-link mt-3"
          >Registreren</router-link
        >
        <router-link to="/password_reset" class="btn btn-link mt-3"
          >Wachtwoord Vergeten?</router-link
        >
      </div>
    </form>
    <div class="form-group" v-else>
      <p class="text-center">You are already logged in.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
    };
  },
  computed: {
    ...mapGetters({
      errors: "getErrors",
      status: "getStatus",
      isAuthenticated: "AuthenticationStore/isAuthenticated",
    }),
  },
  methods: {
    ...mapMutations("AuthenticationStore", {
      logout: "logout",
    }),
    handleSubmit() {
        this.submitted = true;
        const { email, password } = this;

        this.$store.dispatch("AuthenticationStore/login", { email, password }).then(() => {
                console.log('logged in...');
        });
    },
  },
};
</script>
