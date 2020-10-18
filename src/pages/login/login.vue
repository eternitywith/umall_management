<template>
  <div class="body">
    <div class="from">
      <h2>登录</h2>
      <el-input
        class="input"
        v-model="form.username"
        placeholder="请输入账号"
        clearable
      ></el-input>
      <el-input
        class="input"
        placeholder="请输入密码"
        v-model="form.password"
        show-password
        clearable
      ></el-input>
      <el-button class="button" type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { userLoginReq } from "../../../src/utils/request";
import { successAlert, warningAlert } from "../../utils/alert";
import {regUsername,regPassword} from "../../utils/rej"
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction",
    }),
    //登录验证
    loginVerify() {
      //账号
      if (this.form.username == "") {
        warningAlert("请输入账号！");
        return false;
      }
      if(!regUsername.test(this.form.username)){
        warningAlert("用户名字母开头，长度5-16，允许字母数字下划线！")
        return false;
      }
      //密码
      if (this.form.password == "") {
        warningAlert("请输入密码！");
        return false;
      }
      if(!regPassword.test(this.form.password)){
        warningAlert("密码以字母开头，长度6~18，只能包含字母、数字、下划线！")
        return false;
      }
      return true;
    },
    login() {
      if (this.loginVerify()) {
        userLoginReq(this.form).then((res) => {
          if (res.data.code == 200) {
            successAlert("登录成功！");
            //将登录信息存储到仓库和本地存储
            console.log(res);
            this.changeUserInfoAction(res.data.list);
            this.$router.push("/");
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
<style lang="stylus" scoped>
@import '../../assets/stylus/index.styl';

.body {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303D60);
  position: relative;
}

.from {
  width: 400px;
  height: 200px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  padding: 30px;
  text-align: center;
}

.form h1 {
  font-weight: bold;
}

.from .input {
  margin: 10px 0;
  width: 100%;
}

.from .button {
  width: 100%;
  margin-top: 10px;
}
</style>