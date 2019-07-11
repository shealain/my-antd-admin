<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar } from "./components";

export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
