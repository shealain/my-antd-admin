<template>
  <div class="login-container">
    <a-form class="login-form" :form="form" @submit="handleLogin">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <a-alert
        type="error"
        :closable="true"
        v-show="error"
        :message="error"
        showIcon
        style="margin-bottom: 24px;"
      />
      <a-form-item>
        <a-input
          v-decorator="[
              'username',
              {initialValue: 'admin', rules: [{ required: true, message: '请输入账户名' }]}
          ]"
          size="large"
          placeholder="请输入账户名"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
              'password',
              {initialValue: '111111', rules: [{ required: true, message: '请输入密码' }]}
          ]"
          size="large"
          placeholder="请输入密码"
          :type="passwordType"
          ref="password"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
        <span class="show-pwd" @click="showPwd">
          <a-icon v-if="passwordType === 'password'" type="eye-invisible" />
          <a-icon v-else type="eye" />
        </span>
      </a-form-item>
      <a-form-item>
        <a-button
          :loading="loading"
          style="width: 100%;margin-top: 24px"
          size="large"
          htmlType="submit"
          type="primary"
        >登录</a-button>
      </a-form-item>
      <div class="tips">
        <span style="margin-right:20px;">用户名: admin</span>
        <span>密 码: any</span>
      </div>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: this.$form.createForm(this),
      loginForm: {
        username: "admin",
        password: "111111"
      },
      passwordType: "password",
      loading: false,
      redirect: undefined,
      error: ""
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        // console.log(route)
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          this.$store.dispatch("user/login", values).then(() => {
            this.$router.push({
              path: this.redirect || "/"
            });
            this.loading = false;
          });
        } else {
          this.error = "error submit!!";
          window.console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: -9px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>

