<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" id="navigationBar">
    <div class="container">
      <!-- <b-navbar-brand href="#">
        <img src="/images/logo.svg" />
      </b-navbar-brand> -->

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="isAuthenticated">
          <!-- <b-nav-item to="/day_update" class="tour-dayupdate"
            >Dagupdate</b-nav-item
          >
          <b-nav-item to="/learning_goals" class="tour-learninggoals"
            >Leerdoelen</b-nav-item
          >
          <b-nav-item to="/progress_stats" class="tour-progressstats"
            >Statistieken</b-nav-item
          > -->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <template v-if="!isAuthenticated">
            <b-nav-item to="/login"> Inloggen </b-nav-item>
            <b-nav-item to="/register">Registreren</b-nav-item>
          </template>

          <b-nav-item-dropdown v-else right>
            <template v-slot:button-content>
              <em>{{ user.name }}</em>
            </template>


            <!-- <b-dropdown-item to="/profile">Profiel</b-dropdown-item>
            <b-dropdown-item to="/learning_goals">Leerdoelen</b-dropdown-item>
            <b-dropdown-item to="/progress_stats">Statistieken</b-dropdown-item> -->
            <b-dropdown-item @click="logout">Uitloggen</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("AuthenticationStore", {
      logout: "logout",
    }),
  },
  computed: {
    ...mapGetters({
        isAuthenticated: "AuthenticationStore/isAuthenticated",
        user: "AuthenticationStore/user",
    }),
  },
};
</script>
