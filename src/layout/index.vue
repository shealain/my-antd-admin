<template>
  <div :class="classObj" class="app-wrapper">
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
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["sidebar"]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      };
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
