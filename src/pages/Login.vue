<template>
  <q-page class="flex flex-center">
    <q-form v-if="!isAuthenticated">
      <q-input
        filled
        type="text"
        v-model="username"
        label="Username"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type a username']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type your password']"
      />

      <div>
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          @click.prevent="login"
        />
      </div>
    </q-form>
    <div v-else>Already logged in!</div>
  </q-page>
</template>

<script>
export default {
  name: "PageLogin",
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("auth/login", {
          username: this.username,
          password: this.password
        })
        .then(data => {
          this.$router.push({ name: "PollsOverview" });
          //TODO show notify message
        })
        .catch(err => {
          console.log("Login failed!");
          //TODO show notify ERROR message
        });
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  }
};
</script>

<style scoped>
form {
  width: 20rem;
}
</style>
