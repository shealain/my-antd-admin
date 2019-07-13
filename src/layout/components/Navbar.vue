<template>
  <div class="navbar">
    <hamburger :is-active="true" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="avatar-container">
        <a-dropdown :trigger="['click']">
          <a class="avatar-wrapper ant-dropdown-link" href="#">
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
            <a-icon type="caret-down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link to="/">
                <a-icon type="home" />&nbsp;主页
              </router-link>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <span style="display:block;" @click="logout">
                <a-icon type="logout" />&nbsp;登出
              </span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "Navbar",
  components: {
    Hamburger,
    Breadcrumb
  },
  computed: {
    avatar() {
      return "/favicon.ico";
    }
  },
  methods: {
    toggleSideBar() {
      console.log("toggleSideBar");
    },
    async logout() {
      console.log("登出:", this.$route.fullPath);
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &:hover-effect {
        transition: background 0.3s;
        cursor: pointer;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      display: inline-block;
      margin-right: 25px;

      .avatar-wrapper {
        position: relative;
        margin-top: 5px;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
          vertical-align: baseline;
        }
      }
    }
  }
}
</style>
