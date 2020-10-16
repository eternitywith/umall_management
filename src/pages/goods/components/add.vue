<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isShow"
      @close="close"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择一级分类"
            @change="changeFirst"
          >
            <el-option value="" label="请选择" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :value="item.id"
              :key="item.id"
              :label="item.catename"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类">
            <el-option value="" label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :value="item.id"
              :key="item.id"
              :label="item.catename"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input
            v-model="form.goodsname"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price" placeholder="请输入价格"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input
            v-model="form.market_price"
            placeholder="请输入市场价格"
          ></el-input>
        </el-form-item>

        <el-form-item class="upload" label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="getFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择商品规格"
            @change="changeSpecs"
          >
            <el-option value=" " label="请选择" disabled></el-option>
            <el-option
              v-for="item in specsList"
              :value="item.id"
              :key="item.id"
              :label="item.specsname"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" placeholder="请选择商品属性" multiple>
            <el-option value=" " label="请选择" disabled></el-option>
            <el-option
              v-for="item in goodsAttrList"
              :label="item"
              :value="item"
              :key="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item v-if="info.isShow" label="商品描述">
          <div id="editor">

          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button v-if="info.isAdd" type="primary" @click="sure()"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update()">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import E from "wangeditor"
import { mapActions, mapGetters } from "vuex";
import { cateListReq,goodsAddReq, goodsInfoReq, goodsUpdateReq } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imageUrl:'',
      //二级分类的list
      secondCateList:[],
      //商品属性list
      goodsAttrList:[],
    };
  },
  computed: {
    ...mapGetters({
      cateList:"cate/cateList",
      specsList:"specs/specsList"
    }),
  },
  methods: {
    ...mapActions({
      reqCateList:"cate/reqListAction",
      reqSpecsList:"specs/reqListAction",
      reqListAction: "goods/reqListAction",
      reqTotalAction:'goods/reqTotalAction'
    }),
    //修改一级分类，获取二级分类
    changeFirst(){
      this.form.second_cateid='',
      this.getSecondList();
    },
    //获得二级分类
    getSecondList(){
      cateListReq({pid:this.form.first_cateid}).then((res)=>{
        //二级分类
        this.secondCateList = res.data.list;
      })
    },

    //修改商品规格
    changeSpecs(){
      //因为是多选框，所以这里赋值成一个数组
      this.form.specsattr =[];
      this.getAttrList();
  
    },
    //获取商品规格下的商品属性
    getAttrList(){
      //在specsList中找到哪一条数据的id和当前this.form.specsid是一样的
      let obj = this.specsList.find((item)=>item.id == this.form.specsid);
      this.goodsAttrList = obj.attrs;
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
    // 表单置空
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl='';
      //二级分类的list
      this.secondCateList=[];
      //商品属性list
      this.goodsAttrList=[];
    },
    //如果是编辑打开的表单，则清除form，避免保留上次编辑的数据
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //表单打开完成加载富文本编辑器
    opened(){
      //将editor放在本实例上
      this.editor = new E("#editor");
      this.editor.create();
      //编辑器创建完成后赋值
      this.editor.txt.html(this.form.description);
    },
    //确定添加
    sure() {
      //将富文本编辑器的内容取出来给form.description
      this.form.description = this.editor.txt.html();
      // specsattr需要转成json格式
      let data ={
        ...this.form,
        specsattr:JSON.stringify(this.form.specsattr)
      }
      // console.log(data)
      goodsAddReq(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //表单消失
          this.info.isShow = false;
          //表单置空
          this.empty();
          this.reqTotalAction();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 取消添加
    cancel() {
      this.info.isShow = false;
    },
    //点击编辑，查看一条数据
    look(id) {
      goodsInfoReq(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //补id，提交修改请求时需要
          this.form.id = id;
          //需要请求一下二级地址的list
          this.getSecondList();
          //图片
          this.imageUrl = this.$imgPre + this.form.img;
          //商品属性从字符串转为[]
          this.form.specsattr = JSON.parse(this.form.specsattr);
          //获取商品属性的数组
          this.getAttrList();
          //给富文本编辑器赋值，但是这个手编辑器还没有创建，等有了编辑器再创建，在opened函数中
          
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      //将富文本编辑器的内容取出来给form.description
      this.form.description = this.editor.txt.html();
      // specsattr需要转成json格式
      let data ={
        ...this.form,
        specsattr:JSON.stringify(this.form.specsattr)
      }
      console.log(data)
      goodsUpdateReq(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //表单消失
          this.info.isShow = false;
          //表单置空
          this.empty();
          
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    //由于商品规格模块使用了分页，但是商品管理模块需要所有的商品规格，不要分页，所以多传一个参数，用来判断是否需要分页
    this.reqSpecsList(true);
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