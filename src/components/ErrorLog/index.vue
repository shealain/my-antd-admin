<template>
  <div v-if="errorLogs.length > 0">
    <a-badge
      :dot="true"
      style="line-height:25px;margin-top:-5px;"
      @click.native="dialogTableVisible=true"
    >
      <a-button style="padding: 6px 10px;" type="danger">
        <svg class="icon-bug" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M127.88 73.143c0 1.412-.506 2.635-1.518 3.669-1.011 1.033-2.209 1.55-3.592 1.55h-17.887c0 9.296-1.783 17.178-5.35 23.645l16.609 17.044c1.011 1.034 1.517 2.257 1.517 3.67 0 1.412-.506 2.635-1.517 3.668-.958 1.033-2.155 1.55-3.593 1.55-1.438 0-2.635-.517-3.593-1.55l-15.811-16.063a15.49 15.49 0 0 1-1.196 1.06c-.532.434-1.65 1.208-3.353 2.322a50.104 50.104 0 0 1-5.192 2.974c-1.758.87-3.94 1.658-6.546 2.364-2.607.706-5.189 1.06-7.748 1.06V47.044H58.89v73.062c-2.716 0-5.417-.367-8.106-1.102-2.688-.734-5.003-1.631-6.945-2.692a66.769 66.769 0 0 1-5.268-3.179c-1.571-1.057-2.73-1.94-3.476-2.65L33.9 109.34l-14.611 16.877c-1.066 1.14-2.344 1.711-3.833 1.711-1.277 0-2.422-.434-3.434-1.304-1.012-.978-1.557-2.187-1.635-3.627-.079-1.44.333-2.705 1.236-3.794l16.129-18.51c-3.087-6.197-4.63-13.644-4.63-22.342H5.235c-1.383 0-2.58-.517-3.592-1.55S.125 74.545.125 73.132c0-1.412.506-2.635 1.518-3.668 1.012-1.034 2.21-1.55 3.592-1.55h17.887V43.939L9.308 29.833c-1.012-1.033-1.517-2.256-1.517-3.669 0-1.412.505-2.635 1.517-3.668 1.012-1.034 2.21-1.55 3.593-1.55s2.58.516 3.593 1.55l13.813 14.106h67.396l13.814-14.106c1.012-1.034 2.21-1.55 3.592-1.55 1.384 0 2.581.516 3.593 1.55 1.012 1.033 1.518 2.256 1.518 3.668 0 1.413-.506 2.636-1.518 3.67l-13.814 14.105v23.975h17.887c1.383 0 2.58.516 3.593 1.55 1.011 1.033 1.517 2.256 1.517 3.668l-.005.01zM89.552 26.175H38.448c0-7.23 2.489-13.386 7.466-18.469C50.892 2.623 56.92.082 64 .082c7.08 0 13.108 2.541 18.086 7.624 4.977 5.083 7.466 11.24 7.466 18.469z"
          />
        </svg>
      </a-button>
    </a-badge>

    <a-modal v-model="dialogTableVisible" width="60%" append-to-body :footer="null">
      <div slot="title">
        <span style="padding-right:10px;">错误日志</span>
        <a-button type="primary" icon="delete" @click="clearAll">清除全部</a-button>
      </div>
      <a-table :columns="columns" :dataSource="errorLogs" bordered>
        <span slot="row" slot-scope="row">
          <div style="margin-bottom:10px;">
            <span class="message-title">消息：</span>
            <a-tag color="red">{{row.message}}</a-tag>
          </div>
          <div style="margin-bottom:10px;">
            <span class="message-title" style="padding-right:8px;">信息：</span>
            <a-tag color="orange">{{row.tag}}</a-tag>
          </div>
          <div style="margin-bottom:10px;">
            <span class="message-title" style="padding-right:18px;">Url：</span>
            <a-tag color="green">{{row.url}}</a-tag>
          </div>
        </span>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "ErrorLog",
  data() {
    return {
      dialogTableVisible: false,
      columns: [
        {
          width: "40%",
          title: "消息提示",
          dataIndex: "row",
          scopedSlots: { customRender: "row" }
        },
        {
          title: "错误信息",
          dataIndex: "info"
        }
      ]
    };
  },
  computed: {
    errorLogs() {
      var errorLogs = this.$store.getters.errorLogs;

      return errorLogs.map((error, index) => {
        return {
          key: index,
          row: {
            message: error.err.message,
            tag: `${error.vm.$vnode.tag} 错误于 ${error.info}`,
            url: error.url
          },
          info: error.err.stack
        };
      });
    }
  },
  methods: {
    clearAll() {
      this.dialogTableVisible = false;
      this.$store.dispatch("errorLog/clearErrorLog");
    }
  }
};
</script>

<style lang="scss" scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
.ant-btn-danger {
  background-color: #f56c6c;
  color: #fff;

  &:hover {
    background-color: #f78989;
    color: #fff;
  }
}
.icon-bug {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
