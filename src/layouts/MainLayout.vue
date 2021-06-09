<template>
  <q-layout view="hhh lpr fff">
    <q-header class="bg-transparent">
      <q-toolbar class="box">
        <!-- <q-toolbar-title>Brandweer Limburg Noord</q-toolbar-title> -->
        <q-toolbar-title>
          <img src="~assets/logo-met-schild.svg" class="logo" />
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        >
          <q-menu
            bordered
            content-class="bg-grey-1"
          >
            <q-list>
              <MenuItem
                v-for="menuItem in menuItems"
                :key="menuItem.linkName"
                v-bind="menuItem"
              />
              <LogoutButton />
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container class="box">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MenuItem from "src/components/MenuItem.vue";
import LogoutButton from "src/components/LogoutButton.vue";

export default {
  name: "MainLayout",
  components: { LogoutButton, MenuItem },
  computed: {
    menuItems() {
      const authRequiredLinks = [
        {
          title: "Voeg poll toe",
          linkName: "CreatePoll"
        },
        {
          title: "Bekijk mijn polls",
          linkName: "PollsOverview"
        }
      ];
      const publicLinks = [
        {
          title: "Login",
          linkName: "Login"
        }
      ];
      return this.$store.getters["auth/isAuthenticated"]
        ? authRequiredLinks
        : publicLinks;
    }
  }
};
</script>
<style lang="sass">
  .box
    margin: 0 auto
    width: 70%
    padding: 20px
</style>
<style lang="sass" scoped>
  .q-layout
    background-image: url("~assets/bg.jpg")
    background-size: cover
  header
    position: static
    .logo
      margin: 20px 20px 20px 0
      height: 100px
  .q-page-container
    padding-top: 40px !important
</style>
