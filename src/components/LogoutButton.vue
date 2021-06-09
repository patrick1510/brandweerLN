<template>
  <q-btn @click="logout">logout</q-btn>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(response => {
          this.$router.push({ name: "Login" });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style></style>
