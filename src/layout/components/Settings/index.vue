<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">页面风格设置</h3>
      <div class="drawer-item drawer-item-flex">
        <div class="img-check-box" @click="toggle">
          <img src="@/assets/siderbar-dark.svg" />
          <div v-if="checked" class="check-item">
            <a-icon type="check" />
          </div>
        </div>
        <div class="img-check-box" @click="toggle">
          <img src="@/assets/siderbar-light.svg" />
          <div v-if="!checked" class="check-item">
            <a-icon type="check" />
          </div>
        </div>
      </div>
      <a-divider />
      <div class="drawer-item">
        <span>开启Tags-View</span>
        <a-switch v-model="tagsView" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>固定Header</span>
        <a-switch v-model="fixedHeader" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>侧边栏Logo</span>
        <a-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings",

  data() {
    return {};
  },
  computed: {
    checked: {
      get() {
        const theme = this.$store.state.settings.theme;
        return theme === "dark";
      },
      set(val) {
        const theme = val ? "dark" : "light";
        this.$store.dispatch("settings/toggleTheme", theme);
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "tagsView",
          value: val
        });
      }
    },
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "fixedHeader",
          value: val
        });
      }
    },
    sidebarLogo: {
      get() {
        return true;
      },
      set(val) {
        
      }
    }
  },
  methods: {
    toggle() {
      this.checked = !this.checked;
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-item-flex {
    display: flex;
  }

  .drawer-switch {
    float: right;
  }

  .ant-divider {
    margin: 10px 0;
  }
}
.img-check-box {
  margin-right: 16px;
  position: relative;
  border-radius: 4px;
  cursor: pointer;

  .check-item {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    padding-top: 15px;
    padding-left: 24px;
    height: 100%;
    color: #1890ff;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>