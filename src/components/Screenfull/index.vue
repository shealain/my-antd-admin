<template>
  <div>
    <a-icon v-if="isFullscreen" type="fullscreen-exit" @click="click" />
    <a-icon v-else type="fullscreen" @click="click" />
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.anticon-fullscreen {
  font-size: 22px;

  svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;
    width: 22px;
    height: 22px;
  }
}
</style>
