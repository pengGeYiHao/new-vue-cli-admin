<template>
  <div class="layout">
      <el-container>
          <el-aside 
            :width="$store.state.navMenuIsActive?'200px':'65px'"
            style="background-color: rgb(238, 241, 246);font-weight: 800;box-sizing: border-box;margin-top: 60px;">
            <slot name="aside"></slot>
          </el-aside>
          <el-container>
              <el-header>
                <slot name="header"></slot>
              </el-header>
              <el-main>
                <slot name="main"></slot>
              </el-main>
              <!-- <el-footer> -->
                <!-- <slot name="footer"></slot>
              </el-footer> -->
          </el-container>
      </el-container>
  </div>
</template>

<script>
export default {
  name: "layout",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-header, .el-footer {
    background-color: #59af50;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>
