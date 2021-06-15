<template>
  <q-layout view="hhh lpr fff">
    <q-header class="bg-transparent">
      <q-toolbar class="flex row justify-between items-center wrap q-pa-md ">
        <img
          src="~assets/logo.svg"
          class="logo"
          alt="Brandweer Limburg Noord"
        />
        <LogoutBox v-if="isAuthenticated" />
      </q-toolbar>
    </q-header>

    <q-page-container class="flex column justify-start items-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LogoutBox from "src/components/LogoutBox.vue";

export default {
  name: "MainLayout",
  components: { LogoutBox },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    }
  }
};
</script>
<style lang="sass" scoped>
// .box
//   margin: 0 auto
//   display: flex
//   flex-direction: row
//   justify-content: space-between
//   flex-wrap: wrap
//   width: 70%
//   padding: 20px
.q-layout
  background-image: url("~assets/bg.jpg")
  background-size: cover
header
  position: static
.logo
  margin-right: 1rem
  height: 5rem
.q-page-container
  padding-top: 40px !important
</style>
