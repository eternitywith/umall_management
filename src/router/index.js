import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

Vue.use(Router)

// import login from "../pages/login/login.vue"

//路由独享守卫函数
function checkedEnter(path,next){
  let menus_url = store.state.userInfo.menus_url;
  if(menus_url.includes(path)){
    next()
  }else{
    next("/")
  }
}

//首页下面的二级路由
export let indexRoutes = [
  {
    path:"menu",
    component:()=>import("../pages/menu/menu.vue"),
    name:"菜单管理",
    beforeEnter(to,from,next){
      checkedEnter("/menu",next)
    }
  },
  {
    path:"manage",
    component:()=>import("../pages/manage/manage.vue"),
    name:"管理员管理",
    beforeEnter(to,from,next){
      checkedEnter("/manage",next)
    }
  },
  {
    path:"role",
    component:()=>import("../pages/role/role.vue"),
    name:"角色管理",
    beforeEnter(to,from,next){
      checkedEnter("/role",next)
    }
  },
  {
    path:"cate",
    component:()=>import("../pages/cate/cate.vue"),
    name:"分类管理",
    beforeEnter(to,from,next){
      checkedEnter("/cate",next)
    }
  },
  {
    path:"specs",
    component: ()=>import("../pages/specs/specs.vue"),
    name:"规格管理",
    beforeEnter(to,from,next){
      checkedEnter("/specs",next)
    }
  },
  {
    path:"seckill",
    component:()=>import("../pages/seckill/seckill.vue"),
    name:"秒杀管理",
    beforeEnter(to,from,next){
      checkedEnter("/seckill",next)
    }
  },
  {
    path:"member",
    component:()=>import("../pages/member/member.vue"),
    name:"会员管理",
    beforeEnter(to,from,next){
      checkedEnter("/member",next)
    }
  },
  {
    path:'banner',
    component:()=>import("../pages/banner/banner.vue"),
    name:"轮播图管理",
    beforeEnter(to,from,next){
      checkedEnter("/banner",next)
    }
  },
  {
    path:"goods",
    component:()=>import("../pages/goods/goods.vue"),
    name:"商品管理",
    beforeEnter(to,from,next){
      checkedEnter("/goods",next)
    }
  }
]

let router =  new Router({
  routes: [
    {
      path: '/login',
      component:()=>import('../pages/login/login.vue'),
      name:"登录"
    },
    // {
    //   path:"/",
    //   component:()=>import("../pages/login/index.vue")
    // },
    {
      path:"/",
      component: ()=>import("../pages/index/index.vue"),
      children:[
        {
          path:"",
          component:()=>import("../pages/home/home.vue")
        },
        ...indexRoutes
      ] 
    }
  ]
})

//登录拦截
router.beforeEach((to,from,next)=>{
  // 如果不是去往登录页面，进行拦截，并跳到登陆页面
  if(to.path =="/login"){
    next();
    return;
  }

  //如果以前登录过了，则next，没有登录过，跳到login
  if(store.state.userInfo.token){
    next();
    return;
  }

  next("/login");
  
})


export default router;
