<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '轮播图添加' : '轮播图编辑'"
      :visible.sync="info.isShow"
      @close="close()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input
            v-model="form.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>

        <el-form-item class="upload" label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-error="getFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button v-else @click="update()" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { bannerAddReq, bannerInfoReq, bannerEditReq } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      //图片路径
      imageUrl: "",
      form: {
        title: '',
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/bannerList",
    }),
  },
  methods: {
    ...mapActions({
      reqBannerListAction: "banner/reqListAction",
    }),
    // 表单置空
    empty() {
      this.imageUrl = "";
      this.form = {
        title: '',
        img: "",
        status: 1,
      };
    },
    //添加验证
    addVerify() {
      if (!this.form.title) {
          warningAlert("请输入轮播图标题！");
          return false;
        }
        if (!this.form.img) {
          warningAlert("请上传图片！");
          return false;
        }
        if (!this.form.status) {
          warningAlert("请选轮播图状态！");
          return false;
        }
      return true;
    },
    //确定添加
    sure() {
      if (this.addVerify()) {
        bannerAddReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            //表单消失
            this.info.isShow = false;
            //表单置空
            this.empty();
            this.reqBannerListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
    // 取消添加
    cancel() {
      this.info.isShow = false;
    },
    //如果是添加按钮打开的表单，就什么都不做，如果是编辑开的表单，就清除form
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //点击编辑，查看一条数据
    look(id) {
      bannerInfoReq(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //补id，提交修改请求时需要
          this.form.id = id;
          this.imageUrl = this.$imgPre + this.form.img;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      if (this.addVerify()) {
        bannerEditReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.empty();
            this.info.isShow = false;
            this.reqBannerListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
    //图片处理
    getFile(e, f) {
      // console.log(123);
      // console.log(f)
      let file = f.raw;

      //图片大小不超过2M
    //   if (file.size > 2 * 1024 * 1024) {
    //     warningAlert("文件不能超过2M！");
    //     return;
    //   }

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
  },
  mounted() {
    this.reqBannerListAction();
  },
};
</script>
<style lang="stylus" scoped>
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