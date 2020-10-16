<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '规格添加' : '规格编辑'"
      :visible.sync="info.isShow"
      @close="close()"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input
            v-model="form.specsname"
            placeholder="请输入规格名称"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrList"
          :key="index"
        >
          <div class="content">
            <div class="input-wrap">
              <el-input v-model="item.value"></el-input>
            </div>
            <el-button v-if="index == 0" type="primary" @click="addAttr()"
              >新增规格属性</el-button
            >
            <el-button v-else type="danger" @click="delAttr(index)"
              >删除</el-button
            >
          </div>
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
        <el-button type="primary" @click="sure()" v-if="info.isAdd"
          >添 加</el-button>
        <el-button v-else type="primary" @click="update()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { indexRoutes } from "../../../router/index";
import {
  specsAddReq,
  specsUpdateReq,
  specsInfoReq,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      //初始化表单数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrList: [{ value: "" }, { value: "" }],
    };
  },
  computed: {
    ...mapGetters({
      list: "specs/specsList",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "specs/reqListAction",
      reqTotalAction:"specs/reqTotalAction"
    }),
    //新增规格属性
    addAttr() {
      this.attrList.push({ value: "" });
    },
    //删除规格属性
    delAttr(index) {
      this.attrList.splice(index, 1);
    },
    //重置数据
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrList = [{ value: "" }, { value: "" }];
    },
    //如果是添加按钮打开的表单，就什么都不做，如果是编辑开的表单，就清除form
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //点击取消
    cancel() {
      //表单消失
      this.info.isShow = false;
    },
    //验证表单数据
    checkedData() {
      //验证规格名称
      if (this.form.specsname == "") {
        warningAlert("规格名称不能为空！");
        return false; //用于判断两个验证是否都通过，只要有一个不通过就返回false
      }

      //验证每个属性值都不能为空
      if (this.attrList.some((item) => item.value == "")) {
        warningAlert("所有的属性值都必填！");
        return false;
      }

      return true;
    },
    //点击确定
    sure() {
      if (!this.checkedData()) {
        return; //验证不通过，不继续执行
      }

      //将attrList中的数据转换成接口需要的数据格式
      //[{value:'s'},{value:'l'}]--->'['s','l']'
      this.form.attrs = JSON.stringify(
        this.attrList.map((item) => 
          item.value
        )
      );

      //发起请求
      specsAddReq(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功弹窗
          successAlert(res.data.msg);
          //数据重置
          this.empty();
          //表单消失
          this.cancel();
          //列表数据要刷新
          this.reqTotalAction()
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击编辑时出现的表单,根据id请求数据
    look(id) {
      specsInfoReq(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          //将请求返回的attrs转换成可展示的数据
          //'['s','l']'--->[{value:'s'},{value:'l'}]
          this.attrList = JSON.parse(this.form.attrs).map((item) => ({
            value: item
          }));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //点击修改,与确定添加的步骤相同
    update() {
      if (!this.checkedData()) {
        return; //验证不通过，不继续执行
      }
      //与添加一样转换数据
      this.form.attrs = JSON.stringify(this.attrList.map((item) => item.value));
      specsUpdateReq(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          //重新请求数据
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.content {
  display: flex;
}
.input-wrap {
  flex: 1;
}
</style>