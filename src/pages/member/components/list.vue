<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
    >
      <el-table-column prop="uid" label="用户编号" >
      </el-table-column>
      <el-table-column prop="nickname" label="昵称">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" >
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column class="operation" label="操作" >
        <template slot-scope="scope">
          <el-button class="btn" type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
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
    //点击编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
</style>