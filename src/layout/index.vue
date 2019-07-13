<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <tags-view />
      <app-main />
      <right-panel>
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import {
  Sidebar,
  Navbar,
  AppMain,
  RightPanel,
  Settings,
  TagsView
} from "./components";

export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    AppMain,
    RightPanel,
    Settings,
    TagsView
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
