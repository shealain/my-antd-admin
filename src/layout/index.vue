<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
      <right-panel></right-panel>
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain, RightPanel } from "./components";

export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    AppMain,
    RightPanel
  },
  computed: {

  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
