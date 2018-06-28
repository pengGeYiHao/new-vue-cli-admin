<template>
  <div class="editWorldCup">
    <el-form :model="form" size="small">
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="活动名称:" :label-width="'100px'">
            <el-select v-model="form.type" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in activityList"
                :label="item.name"
                :value="item.competitionType"
                :key="item.competitionType"
              >
              </el-option>
              <!-- <el-option
                label="世界杯"
                :value="10000"
              >
              </el-option>
              <el-option
                label="NBA"
                :value="30000"
              >
              </el-option>
              <el-option
                label="欧冠"
                :value="10001"
              >
              </el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="比赛性质:" :label-width="'100px'">
            <el-select v-model="form.subtype" placeholder="请选择" :disabled="form.status == 0 || form.status == 1" style="width: 100%;">
              <el-option
                label="1/8决赛"
                :value="1008"
              >
              </el-option>
              <el-option
                label="1/4决赛"
                :value="1004"
              >
              </el-option>
              <el-option
                label="半决赛"
                :value="1002"
              >
              </el-option>
              <el-option
                label="决赛"
                :value="1001"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="开始时间:" :label-width="'100px'">
            <el-date-picker
              :disabled="form.status == 1"
              v-model="form.startTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="参赛队A:" :label-width="'100px'">
            <el-input v-model="form.player1Name" placeholder="请输入" :disabled="form.status == 0 || form.status == 1 || form.status == 2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="A队队标(大图):" :label-width="'100px'">
            <el-upload
              ref="upload"
              class="upload-demo"
              name="file"
              :action="uploadUrl"
              :before-remove="()=>false"
              :auto-upload="true"
              :on-change="(file, fileList)=>uploadHandleChange('a大图',fileList)"
              :file-list="fileListA"
              list-type="picture-card"
              :on-success="(res,file)=>uploadSuccessHandle(res,'a大图')"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="A队队标(小图):" :label-width="'100px'">
            <el-upload
              ref="upload"
              class="upload-demo"
              name="file"
              :action="uploadUrl"
              :before-remove="()=>false"
              :auto-upload="true"
              :on-change="(file, fileList)=>uploadHandleChange('a小图',fileList)"
              :file-list="fileListASmall"
              list-type="picture-card"
              :on-success="(res,file)=>uploadSuccessHandle(res,'a小图')"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="A队分数:" :label-width="'100px'">
            <el-input-number v-model="form.player1Score" placeholder="请输入" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="A队获胜赔率:" :label-width="'100px'">
            <el-input-number v-model="form.player1WinOdds" :precision="1" :step="0.1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="参赛队B:" :label-width="'100px'">
            <el-input v-model="form.player2Name" placeholder="请输入" :disabled="form.status == 0 || form.status == 1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="B队队标(大图):" :label-width="'100px'">
            <el-upload
              ref="upload"
              class="upload-demo"
              name="file"
              :action="uploadUrl"
              :before-remove="()=>false"
              :auto-upload="true"
              :on-change="(file, fileList)=>uploadHandleChange('b大图',fileList)"
              :file-list="fileListB"
              list-type="picture-card"
              :on-success="(res,file)=>uploadSuccessHandle(res,'b大图')"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="B队队标(小图):" :label-width="'100px'">
            <el-upload
              ref="upload"
              class="upload-demo"
              name="file"
              :action="uploadUrl"
              :before-remove="()=>false"
              :auto-upload="true"
              :on-change="(file, fileList)=>uploadHandleChange('b小图',fileList)"
              :file-list="fileListBSmall"
              list-type="picture-card"
              :on-success="(res,file)=>uploadSuccessHandle(res,'b小图')"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="B队分数:" :label-width="'100px'">
            <el-input-number v-model="form.player2Score" placeholder="请输入" :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="B队获胜赔率:" :label-width="'100px'">
            <el-input-number v-model="form.player2WinOdds" :precision="1" :step="0.1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="状态:" :label-width="'100px'">
            <el-select v-model="form.status" placeholder="请选择" style="width: 100%;">
              <el-option
                label="未开赛"
                :value="0"
              >
              </el-option>
              <el-option
                label="进行中"
                :value="1"
              >
              </el-option>
              <el-option
                label="已结束"
                :value="2"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col >
          <el-form-item label="进行中可投注时间:" :label-width="'100px'">
            <el-input-number v-if="form.status == 1 && new Date().getTime() - form.startTime <= 45*60*1000" v-model="form.configInterval" placeholder="请输入" :min="0" :max="45" :disabled="form.status == 1"></el-input-number>
            <el-input-number v-else v-model="form.configInterval" placeholder="请输入" :min="0" :disabled="form.status == 1"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: right;margin-top: 10px;">
      <!-- <el-button type="primary" size="mini" @click="closeHandle">重置</el-button> -->
      <el-button type="primary" size="mini" @click="onSubmit" :loading="loading">提交</el-button>
    </div>
  </div>
</template>

<script>
import WorldCupService from "@/service/worldCup/worldCupService";
export default {
  name: "eidtWorldCup",
  props: ["formSubmit", "popData", "dialogHandleClose"],
  data() {
    return {
      loading: false,
      form: {
        activityId: "",
        competitionId: "",
        type: 10000, // 10000世界杯 10001欧冠  30000:NBA
        subtype: 1008, // 比赛性质 1001:决赛   1002:半决赛  1004:4强赛 1008:八强赛
        startTime: null, // 时间戳 开始时间
        player1Name: "", // 参赛队A 名称
        player1Flag: "", // 参赛对A 图标 大图
        player1FlagSmall: "", // 参赛队A 图标 小图
        player1Score: 0, // 参赛队A 分数
        player1WinOdds: 0, // 参赛队A 获胜赔率
        player2Name: "", // 参赛队B 名称
        player2Flag: "", // 参赛对B 图标 大图
        player2FlagSmall: "", // 参赛队B 图标 小图
        player2Score: 0, // 参赛队B 分数
        player2WinOdds: 0, // 参赛队B 获胜赔率
        status: "", //状态  0:未开始  1:进行中  2:已结束
        configInterval: 0 //进行中可投注时间
      },
      fileListA: [],
      fileListB: [],
      fileListASmall: [],
      fileListBSmall: [],

      uploadUrl: "",

      configIntervalMax: 45,
      activityList: []
    };
  },
  created() {
    this.uploadUrl = "http://testapi.hoolihome.com:92/activity/admin/image";
    this.getActivityList();
    this.getListDetail();
  },
  methods: {
    getActivityList() {
      WorldCupService.getActivityList({}, this, res => {
        let data = res.data;
        if (data.code == 0) {
          this.activityList = data.data.list;
        } else {
          this.$message({
            type: "erroe",
            message: "获取失败!"
          });
        }
      });
    },
    getListDetail() {
      let f = { ...this.form };
      WorldCupService.getListDetail(
        {
          activityId: this.popData.activityId,
          competitionId: this.popData.competitionId
        },
        this,
        res => {
          let data = res.data;
          if (data.code == 0) {
            f.activityId = data.data.activityId;
            f.competitionId = data.data.competitionId;
            f.startTime = data.data.startTimeUnix * 1000;
            f.status = data.data.statusCode;
            f.type = 10000; //世界杯
            f.subtype = data.data.subtypeCode;
            f.player1Flag = data.data.player1Flag;
            f.player1FlagSmall = data.data.player1Flag;
            f.player1Name = data.data.player1Name;
            f.player1Score = data.data.player1Score;
            f.player1WinOdds = data.data.player1WinOdds;
            f.player2Flag = data.data.player2Flag;
            f.player2FlagSmall = data.data.player2Flag;
            f.player2Name = data.data.player2Name;
            f.player2Score = data.data.player2Score;
            f.player2WinOdds = data.data.player2WinOdds;
            f.configInterval = data.data.configInterval - 0;
            data.data.player1Flag &&  (this.fileListA = [{ url: data.data.player1Flag }]);
            data.data.player2Flag &&  (this.fileListB = [{ url: data.data.player2Flag }]);
            data.data.player2FlagSmall && (this.fileListBSmall = [{ url: data.data.player2FlagSmall }]);
            data.data.player1FlagSmall && (this.fileListASmall = [{ url: data.data.player1FlagSmall }]);
            this.$set(this, "form", f);
          } else {
            this.$message({
              type: "erroe",
              message: "获取失败!"
            });
          }
        }
      );
    },
    uploadHandleChange(file, fileList) {
      if (file == "a大图") {
        this.fileListA = fileList.slice(-1);
      }
      if (file == "a小图") {
        this.fileListASmall = fileList.slice(-1);
      }
      if (file == "b大图") {
        this.fileListB = fileList.slice(-1);
      }
      if (file == "b小图") {
        this.fileListBSmall = fileList.slice(-1);
      }
    },
    uploadSuccessHandle(res, file) {
      if (file == "a大图") {
        this.form.player1Flag = res.data;
      }
      if (file == "a小图") {
        this.form.player1FlagSmall = res.data;
      }
      if (file == "b大图") {
        this.form.player2Flag = res.data;
      }
      if (file == "b小图") {
        this.form.player2FlagSmall = res.data;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    closeHandle() {
      this.dialogHandleClose();
    },
    onSubmit() {
      let params = { ...this.form };
      params.startTime = new Date(this.form.startTime)
        .getTime()
        .toString()
        .substring(0, 10);
      this.loading = true;
      WorldCupService.edit(params, this, res => {
        let data = res.data;
        if (data.code === 0) {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.formSubmit();
        } else {
          this.$message({
            type: "error",
            message: "操作失败!"
          });
        }
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.editWorldCup {
  text-align: left;
}
</style>

