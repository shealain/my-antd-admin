<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <tags-view v-if="needTagsView" />
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

import ResizeMixin from "./mixin/ResizeHandler";

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
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(["sidebar", "device"]),
    needTagsView() {
      return this.$store.state.settings.tagsView;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
