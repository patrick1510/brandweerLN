<template>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-form>
        <q-input
          filled
          class="form-field"
          type="text"
          v-model="username"
          label="Gebruikersnaam"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Vul een gebruikersnaam in'
          ]"
        />

        <q-input
          filled
          class="form-field"
          type="password"
          v-model="password"
          label="Wachtwoord"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Vul een wachtwoord in']"
        />

        <div>
          <q-btn
            label="Login"
            type="submit"
            color="primary"
            :disable="isLoading || isFormEmpty"
            @click.prevent="login"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "PageLogin",
  data() {
    return {
      username: null,
      password: null,
      isLoading: false
    };
  },
  created() {
    if (this.$store.getters["auth/isAuthenticated"]) {
      this.$router.push({ name: "PollsOverview" });
    }
  },
  methods: {
    login() {
      this.isLoading = true;
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
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    isFormEmpty() {
      return !(
        this.username &&
        this.username.length > 0 &&
        this.password &&
        this.password.length > 0
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.login-card {
  padding: 3rem;
  background-color: white;
}
form {
  width: 20rem;
}
.form-field {
  margin-bottom: 1rem;
}
</style>
