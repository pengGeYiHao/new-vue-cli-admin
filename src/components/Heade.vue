<template>
  <div class="heade" style="display: flex;justify-content: space-between;font-size: 12px;align-items: center;">
    <div>
      <i v-if="$store.state.navMenuIsActive" class="el-icon-close" style="margin-right: 15px" @click="hideNavMenuHandle"></i>
      <i v-else class="el-icon-tickets" style="margin-right: 15px" @click="showNavMenuHandle"></i>
    </div>
    <div style="display: flex;flex-direction: row;align-items: center;">
      <!-- <el-dropdown style="display: flex;" @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px;color: #fff;font-size: 20px;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showUserDetails">查看资料</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>用户名</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "heade",
  mounted() {
    let self = this;
    window.onresize = function temp() {
      self.isShowHandle();
    };
  },
  created() {
    this.isShowHandle();
  },
  methods: {
    hideNavMenuHandle() {
      this.$store.dispatch("hideNavMenu");
    },
    showNavMenuHandle() {
      this.$store.dispatch("showNavMenu");
    },
    isShowHandle() {
      if (
        document.documentElement.clientWidth <= 900 &&
        this.$store.state.navMenuIsActive === true
      ) {
        this.hideNavMenuHandle();
      } else if (
        document.documentElement.clientWidth > 900 &&
        this.$store.state.navMenuIsActive === false
      ) {
        this.showNavMenuHandle();
      }
    },
    handleCommand(command) {
      if (command === "logout") {
        if (this.getCookie("hooli_token")) {
          this.delCookie("hooli_token");
        }
        if (!!this.$store.state.userInfo.username) {
          this.$store.dispatch("delUserInfo");
        }
        this.$router.push("/login");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
