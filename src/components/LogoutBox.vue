<template>
  <div class="logout-box">
    <h2 class="logout-box__message">Hallo {{ name }}</h2>
    <q-btn
      class="logout-box__button"
      @click="logout"
      color="secondary"
      text-color="black"
      >Log uit</q-btn
    >
  </div>
</template>

<script>
export default {
  name: "LogoutBox",
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
  },
  computed: {
    name() {
      return this.$store.getters["auth/name"];
    }
  }
};
</script>

<style lang="scss" scoped>
.logout-box {
  background-color: $primary;
  padding: 1rem;
  border-radius: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 30rem) {
    flex-direction: column;
  }

  &__message {
    font-weight: 100;
    flex: 1;
  }
}
</style>
