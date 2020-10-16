<template>
  <div>
    <!-- <h1>首页</h1> -->
    <div id="echarts" class="box"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/cateList",
    }),
  },
  //采用watch监听数据
  watch: {
    list: {
      handler() {
        //在list数据生成之后加载图表
        if (this.list.length > 0) {
          //初始化图表
          var myChart = echarts.init(document.getElementById("echarts"));
          //数据和配置项
          var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["下级分类数量"],
            },
            xAxis: {
              data: this.list.map(item=>item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "下级分类数量",
                type: "line",
                data: this.list.map(item=>item.children.length),
              },
            ],
          };
          // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      cateListReq:"cate/reqListAction"
    }),
  },
  mounted() {
      this.cateListReq()
  },
};
</script>

<style scoped>
.box{
  width: 70%;
  height: 400px;
  margin: 45px auto;
  border:  1px dashed grey;

}
</style>