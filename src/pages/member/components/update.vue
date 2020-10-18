<template>
  <div>
    <el-dialog :title="'会员编辑'" :visible.sync="info.isShow" @close="close()">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            placeholder="请输入密码/为空默认不修改密码"
          ></el-input>
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
        <el-button type="primary" @click="update()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { indexRoutes } from "../../../router/index";
import { memberInfoReq, memberUpdateReq } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import {regNickname,regPassword,regPhone} from "../../../utils/rej.js"
export default {
  props: ["info"],
  data() {
    return {
      //初始化表单数据
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "member/reqListAction",
    }),
    //重置数据
    empty() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    //如果是添加按钮打开的表单，就什么都不做，如果是编辑开的表单，就清除form
    close() {
      this.empty();
    },
    //点击取消
    cancel() {
      //表单消失
      this.info.isShow = false;
    },
    //添加验证
    addVerify() {
      if (!this.form.phone) {
        warningAlert("请输入手机号！");
        return false;
      }
      if(!regPhone.test(this.form.phone)){
        warningAlert("手机号格式不正确！")
        return false;
      }
      if (!this.form.nickname) {
        warningAlert("请输入昵称！");
        return false;
      }
      if(!regNickname.test(this.form.nickname)){
        warningAlert("昵称只能包含中文、英文、数字、下划线！")
        return false;
      }
      if(this.form.password != ''){
        if(!regPassword.test(this.form.password)){
          warningAlert("密码以字母开头，长度6~18，只能包含字母、数字、下划线！")
          return false;
        }
      }
      if (!this.form.status) {
        warningAlert("请选择管理员状态！");
        return false;
      }
      return true;
    },
    //点击编辑时出现的表单,根据id请求数据
    look(id) {
      // 补id
      this.form.uid = id;
      memberInfoReq(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //密码置空不显示
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击修改,与确定添加的步骤相同
    update() {
      if (this.addVerify()) {
        memberUpdateReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.empty();
            this.info.isShow = false;
            //重新请求数据
            this.reqListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>