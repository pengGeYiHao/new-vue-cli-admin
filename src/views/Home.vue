<template>
  <div class="home">
    <PageSearchForm :fetchData="fetchData" :formData="getListDefaultParams"></PageSearchForm>
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      class="main-table"
    >
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            fixed="left"
          >
          </el-table-column>
          <el-table-column
            label="序号"
            fixed="left"
          >
            <template slot-scope="scope">
              1
            </template>
          </el-table-column>
          <el-table-column
            label="标题1"
            fixed="left"
          >
            <template slot-scope="scope">
              1
            </template>
          </el-table-column>
          <el-table-column
            label="标题2"
            width="110">
            <template slot-scope="scope">
              2
            </template>
          </el-table-column>
          <el-table-column
            label="标题3"
            width="110">
            <template slot-scope="scope">
              3
            </template>
          </el-table-column>
          <el-table-column
            label="标题4"
            width="110">
            <template slot-scope="scope">
              4
            </template>
          </el-table-column>
          <el-table-column
            label="标题5">
            <template slot-scope="scope">
              5
            </template>
          </el-table-column>
          <el-table-column
            label="标题6">
            <template slot-scope="scope">
              6
            </template>
          </el-table-column>
          <el-table-column
            label="标题7">
            <template slot-scope="scope">
              7
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
                  <el-button type="primary" size="mini" @click="operationHandle1">操作1</el-button>
                  <el-button type="primary" size="mini" @click="operationHandle2">操作2</el-button>
                </el-button-group>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="24" type="flex" justify="space-between" align="middle" style="padding:20px;">
          <el-col :span="4">
            <el-dropdown trigger="click" @command="handleCommand">
              <el-button size="mini">
                {{batchOperation?batchOperation:'批量操作'}}<i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="操作1">操作1</el-dropdown-item>
                <el-dropdown-item command="操作2">操作2</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" size="mini" @click="batchOperationHandel">确定</el-button>
          </el-col>
          <el-col :span="20">
            <!-- 分页================================ -->
            <el-pagination
              style="text-align: right;"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="getListDefaultParams.currentPage"
              :page-sizes="[10, 30, 50]"
              :page-size="getListDefaultParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal">
            </el-pagination>
          </el-col>
        </el-row>
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
//搜索栏
import PageSearchForm from "@/searchForm/PageSearchForm";

//  弹窗
import Test from '@/dialog/home/Test'

export default {
  name: "home",
  components: {
    PageSearchForm,
    Test
  },
  data() {
    return {
      tableData: [1, 2, 3, { id: 5 }], //数据列表
      loading: false, //loading状态
      getListDefaultParams: {
        //获取列表数据默认参数    尽量在fetchData 里操作getListDefaultParams，其他地方不要操作，避免混乱
        pageSize: 10, //每页条数
        currentPage: 1, //当前页数
        f1: "f1",
        f2: "normal",
        f3: "f3",
        startTime: "",
        endTime: ""
      },

      dialogTitle: "", // 弹窗名字
      currentTabComponent:"", //弹窗组件名字
      dialogVisible: false, //弹窗是否显示
      popData: {}, //传递弹窗的数据

      pageTotal: 400, //总条数

      batchOperation: "", //批量操作名称
      batchItems: [] //批量操作数据
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
        o.currentPage = pageR - 0;
        this.fetchData(o);
      }
    },
    watchRoute() {
      let page = this.$route.params.page;
      let o = { ...this.getListDefaultParams };
      o.currentPage = page;
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
        //        this.loading = true
        console.log(this.getListDefaultParams);
        //        testService.getList(params, this, (res) => {
        //          let data = res.body.data.result
        //          if (data.status === 0) {
        //            self.loading = false
        //          }
        //        })
      }
    },
    handleSelectionChange(items) {
      this.batchItems = items;
    },
    handleSizeChange(val) {
      let o = { ...this.getListDefaultParams };
      o.pageSize = val;
      this.fetchData(o, { isFirstPage: true });
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$router.push({ params: { page: val } });
      console.log(`当前页: ${val}`);
    },
    handleCommand(command) {
      this.batchOperation = command;
    },
    operationHandle1(data) {
      this.dialogVisible = true;
      this.dialogTitle = "操作1";
      this.currentTabComponent = "Test";
      this.popData = data;
    },
    operationHandle2(data) {
      this.dialogVisible = true;
      this.dialogTitle = "操作2";
      this.currentTabComponent = "Test";
      this.popData = data;
    },
    batchOperationHandel() {
      //这里发送批量操作请求
      console.log(this.batchItems);
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
