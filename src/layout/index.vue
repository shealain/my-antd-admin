<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { Sidebar } from "./components";

export default {
  name: "Layout",
  components: {
    Sidebar
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
