<template>
<div>
  <el-table
    :data="list"
    style="width: 100%"
    border
    :default-sort="{ prop: '', order: 'descending' }"
  >
    <el-table-column prop="id" label="商品编号" >
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" >
      </el-table-column>
      <el-table-column label="商品价格" >
        <template slot-scope="scope">
          <span>{{scope.row.price | filterPrice}}</span>
        </template>
      </el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img v-if="scope.row.img!=null" :src="$imgPre + scope.row.img" alt="">
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew == 1" type="primary"
            >是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot == 1" type="primary"
            >是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
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
   <!-- 分页组件 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="changePage">
    </el-pagination>
</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { goodsDelReq } from '../../../utils/request';
import {warningAlert,successAlert} from "../../../utils/alert"
export default {
    data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/goodsList",
      total:"goods/total",
      size:"goods/size"
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "goods/reqListAction",
      reqTotalAction: "goods/reqTotalAction",
      reqPageAction:"goods/reqPageAction",

    }),
    //点击编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //点击删除按钮
    del(id) {
      //确定删除
      goodsDelReq(id).then((res) => {
        if (res.data.code == 200) {
          //删除成功提示
          successAlert(res.data.msg);
          //重新请求数据
          this.reqTotalAction();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //页码改变
    changePage(e){
        // console.log(e);
        this.reqPageAction(e);
    }
  },
  mounted() {
    this.reqTotalAction();
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