<template>
<div>
  <el-table
    :data="list"
    style="width: 100%"
    border
    :default-sort="{ prop: '', order: 'descending' }"
  >
    <el-table-column prop="title" label="活动名称" >
      </el-table-column>

    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status ==1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @del="del(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { seckillDelReq } from '../../../utils/request';
import {warningAlert,successAlert} from "../../../utils/alert"
export default {
    data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "seckill/seckillList",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "seckill/reqListAction",
    }),
    //点击编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //点击删除按钮
    del(id) {
      //确定删除
      seckillDelReq(id).then((res) => {
        if (res.data.code == 200) {
          //删除成功提示
          successAlert(res.data.msg);
          //重新请求数据
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: auto;
}
</style>