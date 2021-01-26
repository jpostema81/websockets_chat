<!-- This form is used by:
    * registration page
    * dashboard edit user page
    * user profile page
-->

<template>
  <b-form>
    <b-card class="mb-2">
      <h3>Gegevens</h3>

      <b-form-group v-if="config.firstName" label-cols-sm="3" label="Voornaam">
        <b-form-input
          type="text"
          v-model="data.first_name"
          required
          name="first_name"
          class="form-control"
          :class="{
            'is-invalid': submitted && errors.hasOwnProperty('first_name'),
          }"
        />
        <div
          v-if="submitted && errors.hasOwnProperty('first_name')"
          class="invalid-feedback"
        >
          {{ errors.first_name.join(" ") }}
        </div>
      </b-form-group>

      <b-form-group v-if="config.lastName" label-cols-sm="3" label="Achternaam">
        <b-form-input
          type="text"
          v-model="data.last_name"
          required
          name="last_name"
          class="form-control"
          :class="{
            'is-invalid': submitted && errors.hasOwnProperty('last_name'),
          }"
        />
        <div
          v-if="submitted && errors.hasOwnProperty('last_name')"
          class="invalid-feedback"
        >
          {{ errors.last_name.join(" ") }}
        </div>
      </b-form-group>

      <b-form-group v-if="config.email" label-cols-sm="3" label="Emailadres">
        <b-form-input
          type="text"
          v-model="data.email"
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
      </b-form-group>

      <b-form-group v-if="config.password" label-cols-sm="3" label="Wachtwoord">
        <b-form-input
          type="password"
          v-model="data.password"
          required
          title="Gebruik a.u.b. ten minste 6 tekens"
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
      </b-form-group>

      <b-form-group
        v-if="config.password"
        label-cols-sm="3"
        label="Wachtwoord bevestiging"
      >
        <b-form-input
          type="password"
          v-model="data.password_confirmation"
          required
          title="Gebruik a.u.b. ten minste 6 tekens"
          name="password_confirmation"
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
      </b-form-group>

    </b-card>
  </b-form>
</template>

<script>
import { mapGetters } from "vuex";
// import Multiselect from "vue-multiselect";

export default {
  model: {
    prop: "data",
    event: "update",
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    submitted: {
      type: Boolean,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
  },
  components: {
    // Multiselect,
  },
  data() {
    return {
    //   reminder_active: this.data.reminder_interval ? "active" : "not_active",
    };
  },
  computed: {
    // ...mapGetters({ errors: "getErrors" }),
    // roles() {
    //   return this.$store.state.RolesStore.roles;
    // },
  },
  methods: {
    // changeReminder(e) {
    //   if (this.reminder_active == "not_active") {
    //     this.data.reminder_interval = 1;
    //   } else {
    //     this.data.reminder_interval = null;
    //   }
    // },
  },
};
</script>
