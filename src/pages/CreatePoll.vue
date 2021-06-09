<template>
  <q-page class="flex flex-center">
    <q-form>
      <q-input
        filled
        type="text"
        v-model="username"
        label="Username"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password"
        lazy-rules
        :rules="[
          val => (val !== null && val !== '') || 'Please type your password'
        ]"
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
      console.log(`logging in ${this.username} with ${this.password}`);
    }
  }
};
</script>
