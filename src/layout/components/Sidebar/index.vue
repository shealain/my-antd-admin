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
      <my-menu :theme="theme" :mode="mode" :collapsed="isCollapse" :menuData="routes" />
    </a-layout-sider>
  </div>
</template>

<script>
import MyMenu from "./menu";

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
    MyMenu
  },
  data() {
    return {};
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    theme() {
      return "light";
    },
    mode() {
      return true ? "inline" : "vertical";
    },
    isCollapse() {
      return false;
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