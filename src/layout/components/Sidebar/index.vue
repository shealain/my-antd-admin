<template>
  <div>
    <a-layout-sider
      :class="[theme, 'sider', 'shadow']"
      :collapsible="collapsible"
      :trigger="null"
      :style="{height:'100%'}"
      width="256px"
      v-model="isCollapse"
    >
      <logo v-if="showLogo" :theme="theme" :collapse="isCollapse" />

      <my-menu :theme="theme" :mode="mode" :collapsed="isCollapse" :menuData="permission_routes" />
    </a-layout-sider>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import MyMenu from "./menu";
import Logo from "./Logo";

export default {
  name: "Sidebar",
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  components: {
    MyMenu,
    Logo
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["permission_routes", "sidebar", "theme"]),
    mode() {
      return this.sidebar.opened ? "inline" : "vertical";
    },
    isCollapse() {
      // console.log('isCollapse', this.sidebar.opened)
      return !this.sidebar.opened;
    },
    showLogo() {
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/theme-dark/variables.scss";
@import "~@/styles/theme-light/variables.scss";

.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.sider {
  z-index: 10;
}
.sider.dark {
  background-color: $darkSideBarBg;
}
.sider.light {
  background-color: $lightSideBarBg;
}
</style>