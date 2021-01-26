<template>
  <div>
    <h3>Registreren</h3>

    <user-form
      v-model="userData"
      :submitted="submitted"
      :config="config"
    ></user-form>

    <div class="form-group">
      <b-button
        variant="primary"
        @click="registerNewUser"
        :disabled="status === 'registering'"
        >Registreer</b-button
      >
      <img
        v-show="status === 'registering'"
        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
      />
      <router-link to="/login" class="btn btn-link">Annuleer</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import UserForm from "./../components/forms/UserForm";

export default {
  data() {
    return {
      config: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        roles: false,
      },
      userData: {},
      submitted: false,
    };
  },
  components: { UserForm },
  computed: {
    ...mapGetters({
      status: "getStatus",
    }),
  },
  methods: {
    ...mapActions("UsersStore", {
      register: "register",
    }),
    registerNewUser(e) {
      this.submitted = true;

      this.register(this.userData).then(() => {
        this.$router.push("/login");

        setTimeout(() => {
          // display success message after route change completes
          MessageBus.$emit("message", {
            message:
              "Registratie gelukt! Controleer je email voor het bevestigen van je registratie",
            variant: "success",
          });
        });
      });
    },
  },
  created() {
  },
};
</script>
