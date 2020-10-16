<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '商品分类添加' : '商品分类编辑'"
      :visible.sync="info.isShow"
      @close="close()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input
            v-model="form.catename"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>

        <el-form-item v-if="form.pid != 0" class="upload" label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="getFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
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
import { cateAddReq, cateInfoReq, cateEditReq } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      //图片路径
      imageUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      //   roleList: "role/roleList",
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      reqCateListAction: "cate/reqListAction",
    }),
    // 表单置空
    empty() {
      this.imageUrl = "";
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
    },
    //确定添加
    sure() {
      cateAddReq(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //表单消失
          this.info.isShow = false;
          //表单置空
          this.empty();
          this.reqCateListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
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
      cateInfoReq(id).then((res) => {
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
      cateEditReq(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.info.isShow = false;
          this.reqCateListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //图片处理
    getFile(e) {
      // console.log(e)
      let file = e.raw;

    //图片大小不超过2M
    if(file.size > 2*1024*1024){
        warningAlert("文件不能超过2M！");
        return;
    }

    //规定文件只能是图片
    let imgExtArr  = [".jpg",".png",".jpeg",".gif"];
    let extname = file.name.slice(file.name.lastIndexOf("."))
    if(!imgExtArr.some((item)=>item ==extname)){
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
    this.reqCateListAction();
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