<template>
  <div class="worldCup" id="worldCup">
    <div style="display:flex;justifyContent:flex-start;padding:20px;">
      <el-button type="primary" size="mini" @click="addHandle">添加</el-button>
    </div>
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      class="main-table"
    >
      <template>
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
        >
          <el-table-column
            label="活动ID"
          >
            <template slot-scope="scope">
              {{scope.row.activityId}}
            </template>
          </el-table-column>
          <el-table-column
            label="比赛ID"
            fixed="left"
          >
            <template slot-scope="scope">
              {{scope.row.competitionId}}
            </template>
          </el-table-column>
          <el-table-column
            label="活动名称">
            <template slot-scope="scope">
              {{scope.row.activityName}}
            </template>
          </el-table-column>
          <el-table-column
            label="参赛队A">
            <template slot-scope="scope">
              {{scope.row.player1Name}}
            </template>
          </el-table-column>
          <el-table-column
            label="参赛对B">
            <template slot-scope="scope">
              {{scope.row.player2Name}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              {{scope.row.statusShow}}
            </template>
          </el-table-column>
          <el-table-column
            label="比赛性质">
            <template slot-scope="scope">
              {{scope.row.subtypeShow}}
            </template>
          </el-table-column>
          <el-table-column
            label="开始时间">
            <template slot-scope="scope">
              {{scope.row.startTime}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="operation">
                <el-button-group>
                  <el-button type="primary" size="mini" @click="()=>editHandle(scope.row)" :disabled="scope.row.statusCode == 2">编辑</el-button>
                  <el-button type="primary" size="mini" @click="()=>delHandle(scope.row)" :disabled="scope.row.statusCode == 1 || scope.row.operation.indexOf(1) == -1">删除</el-button>
                </el-button-group>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="24" type="flex" justify="space-between" align="middle" class="main-footer"  style="padding:20px;">
          <el-col :span="4"></el-col>
          <el-col :span="20">
            <!-- 分页================================ -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="getListDefaultParams.page"
              :page-sizes="[10, 30, 50]"
              :page-size="getListDefaultParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal">
            </el-pagination>
          </el-col>
        </el-row>
      </template>
    </div>
    <!--弹窗================================= -->
    <el-dialog
      :title="dialogTitle+'窗口'"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="dialogHandleClose">
      <template>
        <component v-bind:is="currentTabComponent" :formSubmit="formSubmit" :popData="popData" :dialogHandleClose="dialogHandleClose"></component>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import WorldCupService from "@/service/worldCup/worldCupService";

//  弹窗
import Add from "@/dialog/worldCup/Add";
import Edit from "@/dialog/worldCup/Edit";

export default {
  name: "worldCup",
  components: {
    Add,
    Edit
  },
  data() {
    return {
      tableData: [], //数据列表
      loading: false, //loading状态
      getListDefaultParams: {
        //获取列表数据默认参数    尽量在fetchData 里操作getListDefaultParams，其他地方不要操作，避免混乱
        type:10000, //代表世界杯
        pageSize: 10, //每页条数
        page:1, //当前页
        showType: 'admin', //后台展示列表
      },

      dialogTitle: "", // 弹窗名字
      currentTabComponent:"", //弹窗组件名字
      dialogVisible: false, //弹窗是否显示
      popData: {}, //传递弹窗的数据

      pageTotal: 0, //总条数
    };
  },
  created() {
    this.init()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "watchRoute"
  },
  methods: {
    init() {
      let pageR = this.$route.params.page;
      if (pageR <= 0) {
        this.fetchData(null, { isFirstPage: true });
      } else {
        let o = { ...this.getListDefaultParams };
        o.page = pageR - 0;
        this.fetchData(o);
      }
    },
    watchRoute() {
      let page = this.$route.params.page;
      let o = { ...this.getListDefaultParams };
      o.page = page;
      this.fetchData(o);
    },
    fetchData(data, page) {
      // 保存筛选条件
      if (data) {
        this.getListDefaultParams = { ...data };
      }
      if (page && page.isFirstPage === true && this.$route.params.page != 1) {
        //这里判断是否是第一页。如果不是需要在已填写的筛选条件下跳转到第一页
        this.$router.push({ params: { page: 1 } });
      } else {
        // 发送请求
        let self = this;
        this.loading = true
        WorldCupService.getList(this.getListDefaultParams, this, res => {

          let data = res.data;
          if (data.code === 0) {
            self.tableData = data.data.list
            self.pageTotal = data.data.pages.totalCount-0
          }else {
            self.$message.error(data.msg)
          }
          self.loading = false;
        });
      }
    },
    handleSizeChange(val) {
      let o = { ...this.getListDefaultParams };
      o.pageSize = val;
      this.fetchData(o, { isFirstPage: true });
    },
    handleCurrentChange(val) {
      this.$router.push({ params: { page: val } });
    },
    addHandle() {
      this.dialogVisible = true;
      this.dialogTitle = "添加";
      this.currentTabComponent = "Add";
    },
    editHandle(data) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      this.currentTabComponent = "Edit";
      this.popData = data;
    },
    delHandle(params) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          WorldCupService.delete({activityId:params.activityId,competitionId:params.competitionId}, this, res => {
            let data = res.data;
            if (data.code === 0) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.fetchData();
            } else {
              this.$message({
                type: "error",
                message: "操作失败!"
              });
            }
            this.loading = false;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    dialogHandleClose(done) {
      this.dialogTitle = "";
      this.currentTabComponent = "";
      this.popData = {};
      if (done) {
        done();
      } else {
        this.dialogVisible = false;
      }
    },
    formSubmit() {
      this.dialogVisible = false;
      this.dialogTitle = "";
      this.currentTabComponent = "";
      this.popData = {};
      this.fetchData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
