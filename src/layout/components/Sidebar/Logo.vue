<template>
  <div class="sidebar-logo-container" :class="[theme, collapse ? 'collapse' : null]">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      title: "My Admin",
      logo: "/favicon.ico"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/theme-dark/variables.scss";
@import "~@/styles/theme-light/variables.scss";

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-weight: 600;
      line-height: 50px;
      color: #fff;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.dark {
    .sidebar-title {
      color: $darkSideBarTitle;
    }
  }

  &.light {
    .sidebar-title {
      color: $lightSideBarTitle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
.sidebar-logo-container.dark {
  background: $darkSidebarLogoContainer;
}
.sidebar-logo-container.light {
  background: $lightSidebarLogoContainer;
}
</style>
