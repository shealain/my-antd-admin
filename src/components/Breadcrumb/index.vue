<template>
  <a-breadcrumb class="app-breadcrumb">
    <a-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <span
        v-if="item.redirect==='noRedirect' || index == levelList.length - 1"
        class="no-redirect"
      >{{ item.meta.title }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>

export default {
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },

  mounted() {
    
  },

  methods: {
    getBreadcrumb() {
      // 仅显示带有meta.title的路由
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );

      const first = matched[0];

      if (!this.isDashboard(first)) {
        matched = [
          { path: "/dashboard", meta: { title: "工作仪表盘" } }
        ].concat(matched);
      }

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      // console.log(route)
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },

    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.ant-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
