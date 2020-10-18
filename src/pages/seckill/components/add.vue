<template>
  <div class="box">
    <el-dialog
      :title="info.isAdd ? '活动添加' : '活动修改'"
      :visible.sync="info.isShow"
      @close="close"
      class="dialog"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input
            v-model="form.title"
            placeholder="请输入活动名称"
          ></el-input>
        </el-form-item>

        <el-form-item class="upload" label="活动期限">
          <div class="block">
            <el-date-picker
              v-model="time"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始期限"
              end-placeholder="结束期限"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择一级分类"
            @change="changeFirst"
          >
            <el-option value="" label="请选择" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :value="item.id"
              :key="item.id"
              :label="item.catename"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择二级分类"
            @change="changeSecond"
          >
            <el-option value="" label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :value="item.id"
              :key="item.id"
              :label="item.catename"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option value="" label="请选择" disabled></el-option>
            <el-option
              v-for="item in goodsList"
              :value="item.id"
              :key="item.id"
              :label="item.goodsname"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button v-if="info.isAdd" type="primary" @click="sure()"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import {
  seckillAddReq,
  seckillInfoReq,
  seckillEditReq,
  cateListReq,
  goodsListReq,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        begintime: "",
        endtime: "",
        status: 1,
      },
      time: [],
      //二级分类的list
      secondCateList: [],
      //商品list
      goodsList: [],
      total: 0,
      //时间控件
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      seckillList: "seckill/seckillList",
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqListAction",
      reqListAction: "seckill/reqListAction",
    }),
    //修改一级分类，获取二级分类
    changeFirst() {
      this.form.second_cateid = "";
      this.getSecondList();
    },
    //获得二级分类
    getSecondList() {
      cateListReq({ pid: this.form.first_cateid }).then((res) => {
        //二级分类
        this.secondCateList = res.data.list;
      });
    },
    changeSecond() {
      this.form.goodsid = "";
      this.getGoodsList();
    },
    //根据id获取商品列表
    getGoodsList() {
      goodsListReq({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.goodsList = res.data.list;
      });
    },

    //图片处理
    getFile(e) {
      // console.log(e)
      let file = e.raw;
      //图片大小不超过2M
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件不能超过2M！");
        return;
      }
      //规定文件只能是图片
      let imgExtArr = [".jpg", ".png", ".jpeg", ".gif"];
      let extname = file.name.slice(file.name.lastIndexOf("."));
      if (!imgExtArr.some((item) => item == extname)) {
        warningAlert("文件格式不正确！");
        return;
      }
      //URL.createObjectURL()可以通过文件生成一个地址
      this.imageUrl = URL.createObjectURL(file);
      //将文件保存在form.img
      this.form.img = file;
    },
    // 表单置空
    empty() {
      this.form = {
        title: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        begintime: "",
        endtime: "",
        status: 1,
      };
      this.time = [];
      //二级分类的list
      this.secondCateList = [];
      //商品属性list
      this.goodsList = [];
    },
    //如果是编辑打开的表单，则清除form，避免保留上次编辑的数据
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    //添加验证
    addVerify() {
      if (!this.form.title) {
        warningAlert("请输入活动名称！");
        return false;
      }
      if (!this.form.begintime) {
        warningAlert("请选择活动开始期限！");
        return false;
      }
      if (!this.form.begintime) {
        warningAlert("请选择活动结束期限！");
        return false;
      }
      if (!this.form.first_cateid) {
        warningAlert("请选择一级分类！");
        return false;
      }
      if (!this.form.second_cateid) {
        warningAlert("请选择二级分类！");
        return false;
      }
      if (!this.form.goodsid) {
        warningAlert("请选择商品！");
        return false;
      }
      if (!this.form.status) {
        warningAlert("请选择商品状态！");
        return false;
      }
      return true;
    },

    //确定添加
    sure() {
      this.form.begintime = this.time[0].getTime();
      this.form.endtime = this.time[1].getTime();

      seckillAddReq(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //表单消失
          this.info.isShow = false;
          //表单置空
          this.empty();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    // 取消添加
    cancel() {
      this.info.isShow = false;
    },
    //点击编辑，查看一条数据
    look(id) {
      seckillInfoReq(id).then((res) => {
        if (res.data.code == 200) {
          this.info.isShow = true;
          this.form = res.data.list;
          // 补时间
          this.$set(this.time, 0, new Date(Number(this.form.begintime)));
          this.$set(this.time, 1, new Date(Number(this.form.endtime)));
          //需要请求一下二级地址的list
          this.getSecondList();
          // 获取商品列表
          this.getGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      this.form.begintime = this.time[0].getTime();
      this.form.endtime = this.time[1].getTime();
      if (this.addVerify()) {
        // console.log(data);
        seckillEditReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            //表单消失
            this.info.isShow = false;
            //表单置空
            this.empty();
            this.reqListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
  },
};
</script>
<style lang="stylus" scoped>
.box >>> .el-dialog {
  min-width: 470px;
}

.upload >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.upload >>> .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.upload >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.upload >>> .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>