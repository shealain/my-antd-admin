<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from "./components";

export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
    
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
