<template>
  <el-container class="body">
    <el-aside width="200px">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo asideMenu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <el-menu-item index="/">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template>
        </el-menu-item>

        <!-- 动态侧边栏 -->
        <div v-for="item in userInfo.menus" :key="item.id">
          <!-- 目录 -->
          <el-submenu :index="item.id+''" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>

            <el-menu-item-group>
              <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 菜单 -->
          <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
        </div>

        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/manage">管理员管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu> -->
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="logOut">
          <h2>{{userInfo.username}}</h2>
          <el-button type="danger" @click="logOut">退出登录</el-button>
        </div>
      </el-header>

      <el-main>
        <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-if="$route.name" :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    }),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:"changeUserInfoAction"
    }),
    logOut() {
      //退出登录传递空对象做识别
      this.changeUserInfoAction({});
      this.$router.push("/login")
    }
  },
  mounted() {
    console.log(this.userInfo);
  },
};
</script>
<style scoped>
.body {
  width: 100vw;
  height: 100vh;
}
.body .asideMenu {
  height: 100%;
}

.body .header{
    background-color: #ccc;
}
.breadcrumb{
    margin: 10px 0;
}
.header .logOut{
  float: right;
  height: 100%;
  padding-top:10px;

}
.header .logOut h2{
  margin: 10px;
  line-height: 20px;
}
.header .logOut h2,button{
  float:left;
}
</style>