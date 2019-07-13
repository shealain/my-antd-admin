<template>
  <div :class="{'show':show}" class="header-search">
    <a-icon class="search-icon" type="search" @click.stop="click" />
    <a-select
      showSearch
      placeholder="搜索"
      class="header-search-select"
      ref="headerSearchSelect"
      :value="search"
      :defaultActiveFirstOption="false"
      :showArrow="false"
      :filterOption="false"
      :notFoundContent="null"
      @search="querySearch"
      @change="change"
    >
      <a-select-option
        v-for="item in options"
        :key="item.path"
        :value="item.path"
      >{{item.title.join(' > ')}}</a-select-option>
    </a-select>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import path from "path";

export default {
  name: "HeaderSearch",
  data() {
    return {
      search: "",
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined
    };
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes;
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes);
    },
    show(value) {
      if (value) {
        document.body.addEventListener("click", this.close);
      } else {
        document.body.removeEventListener("click", this.close);
      }
    },
    searchPool(list) {
      this.initFuse(list);
    }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  },
  methods: {
    click() {
      this.show = !this.show;
      if (this.show) {
        if (this.$refs.headerSearchSelect) {
          this.$refs.headerSearchSelect.focus();
        }
      }
    },
    close() {
      if (this.$refs.headerSearchSelect) {
        this.$refs.headerSearchSelect.blur();
      }
      this.options = [];
      this.show = false;
    },
    change(path) {
      this.$router.push(path);
      this.search = "";
      this.options = [];
      this.$nextTick(() => {
        this.show = false;
      });
    },

    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: "title",
            weight: 0.7
          },
          {
            name: "path",
            weight: 0.3
          }
        ]
      });
    },
    // 过滤掉可以在侧栏中显示的路由
    // 并产生国际化的头衔
    generateRoutes(routes, basePath = "/", prefixTitle = []) {
      let res = [];

      for (const router of routes) {
        if (router.hidden) {
          continue;
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        };

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title];

          if (router.redirect !== "noRedirect") {
            // 只push带标题的路由
            // 特例：需要排除没有重定向的父路由器
            res.push(data);
          }
        }

        // 递归子路由
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            data.title
          );
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    },
    querySearch(query) {
      if (query !== "") {
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 22px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 14px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    /deep/ .ant-select-selection {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
