<template>
  <q-item clickable tag="a" target="_blank" @click="goTo">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    title: {
      type: String,
      required: true
    },
    linkName: {
      type: String,
      default: "#"
    }
  },
  methods: {
    goTo(e) {
      this.$router.push({ name: this.linkName });
    }
  }
};
</script>
