<template>
  <div class="aside">
    <div class="title" :style="{width:$store.state.navMenuIsActive?'200px':'65px'}">
      <template v-if="$store.state.navMenuIsActive">活动管理后台</template>
      <template v-else>管理</template>
    </div>
    <el-menu
      :class="[{ isShow:!$store.state.navMenuIsActive}, 'el-menu-vertical-demo']"
      :collapse="!$store.state.navMenuIsActive"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
      background-color="#fff"
      text-color="#000"
      :show-timeout="1"
      :hide-timeout="1"
      mode="vertical"
      :collapse-transition="false"
      :default-active="active"
    >
      <myMenu :model="routeItems"></myMenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "asideM",
  // props: ['routeItems'],
  data() {
    return {
      active: "",

      routeItems: [
        {
          name: "世界杯",
          url: "/activity/admin/worldcup",
          icon: "el-icon-date"
        },
        // {
        //   name: "slider线性图",
        //   url: "/sliderlineimg",
        //   icon: "el-icon-date"
        // },
        // {
        //   name: "slider直方图",
        //   url: "/sliderhistogram",
        //   icon: "el-icon-date"
        // },
        // {
        //   name: "饼状图",
        //   url: "/cakeimg",
        //   icon: "el-icon-date"
        // },
      ]
    };
  },
  watch: {
    $route: "getRouteDetail"
  },
  methods: {
    getRouteDetail(){
      this.active = this.$store.state.route.name;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    myMenu: {
      name: "myMenu",
      props: ["model"],
      render() {
        let list = model => {
          let res = [];
          for (let i = 0; i < model.length; i++) {
            res.push(
              <div key={i}>
                {model[i].child && model[i].child.lenght != 0 ? (
                  <el-submenu
                    index={model[i].name}
                    class={{ isRight: !model[i].icon }}
                  >
                    <template slot="title">
                      {model[i].icon ? <i class={model[i].icon} /> : ""}
                      <span slot="title">{model[i].name}</span>
                    </template>
                    <myMenu model={model[i].child} />
                  </el-submenu>
                ) : (
                  <el-menu-item
                    index={model[i].name}
                    class={{ isRight: !model[i].icon }}
                    route={{ path: model[i].url }}
                  >
                    <i class={model[i].icon} />
                    <span slot="title">{model[i].name}</span>
                  </el-menu-item>
                )}
              </div>
            );
          }
          return res;
        };
        return <div>{list(this.model)}</div>;
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aside {
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
  text-align: left;
  color:#000;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  border: none;
}
.el-menu-vertical-demo.el-menu--collapse {
  width: 65px;
  border: none;
}
.title {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 60px;
  background-color: #59af50;
  color: #fff;
  text-align: center;
  line-height: 60px;
  box-sizing: border-box;
  border-right: 1px solid #fff;
}
</style>
