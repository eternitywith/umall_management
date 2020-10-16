<template>
  <el-table
    :data="cateList"
    style="width: 100%"
    row-key="id"
    border
    :tree-props="{ children: 'children' }"
  >
    <el-table-column prop="id" label="分类编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="catename" label="分类名称" width="180">
    </el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
        <img
          v-if="scope.row.img != null"
          :src="$imgPre + scope.row.img"
          alt=""
        />
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @del="del(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { cateDelReq } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),
    //点击编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      cateDelReq(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
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