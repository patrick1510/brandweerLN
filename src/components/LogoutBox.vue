<template>
  <q-btn
    class="logout-box__button text-body1"
    @click="logout"
    color="grey-9"
    text-color="white"
    :title="`Ingelogd als ${name}`"
    >Log uit</q-btn
  >
</template>

<script>
export default {
  name: "LogoutBox",
  methods: {
    logout() {
      if (
        !confirm(
          `U bent nu ingelogd als ${this.$store.getters["auth/name"]}. Weet u zeker dat u uit wilt loggen?`
        )
      )
        return;
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
