import Vue from 'vue'
import axios from 'axios'
import qs from "qs"

import store from "../store"

//开发环境下
Vue.prototype.$imgPre = "http://localhost:3001"
let baseUrl = "/api"

//打包时
//Vue.prototype.$imgPre=""
//let baseUrl = "/api"

//请求拦截，每次请求时带上token
axios.interceptors.request.use(req=>{
    //登录不拦截
    if(req.url !==baseUrl+"/api/login"){
        req.headers.authorization = store.state.userInfo.token;
    }
    return req;
})

//响应拦截
axios.interceptors.response.use(res=>{
    console.group("=====本次请求路径是："+res.config.url);
    console.log(res);
    console.groupEnd();
    return res;
})

// -----------菜单管理
//菜单添加
export const menuAddReq=(data)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(data)
    })
}

//获取菜单列表
export const menuListReq=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true
        }
    })
}

//删除菜单
export const menuDelReq=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:'post',
        data:qs.stringify({id})
    })
}

//获取一条菜单数据
export const menuInfoReq=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id
        }
    })
}

//修改菜单
export const menuUpdateReq=(data)=>{
    return axios({
        url: baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(data)
    })
}

//---------角色管理
//角色添加
export const roleAddReq=(data)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:'post',
        data:qs.stringify(data)
    })
}

//角色列表
export const roleListReq=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:'get',
    })
}

//获取一条角色信息
export const roleInfoReq=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:'get',
        params:{
            id
        }
    })
}

//角色修改
export const roleEditReq=(data)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(data)
    })
}

//角色删除
export const roleDelReq=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:{
            id
        }
    })
}


//---------商品分类管理
//分类添加
// data={pid,catename,img,status}
//有文件就不能用qs
export const cateAddReq=(data)=>{
    let d = new FormData()
    for(let i in data){
        d.append(i,data[i])
    }
    return axios({
        url:baseUrl+"/api/cateadd",
        method:'post',
        data:d,
    })
}

//分类列表
export const cateListReq=(data)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:'get',
        params:data,
    })
}

//获取一条分类信息
export const cateInfoReq=(id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:'get',
        params:{
            id
        }
    })
}

//分类修改
export const cateEditReq=(data)=>{
    let d = new FormData()
    for(let i in data){
        d.append(i,data[i])
    }
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:d
    })
}

//分类删除
export const cateDelReq=(id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:{
            id
        }
    })
}




// -----------管理员管理
//管理员添加
export const userAddReq=(data)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(data)
    })
}

//管理员总数
export const userCountReq=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}

//获取管理员列表（分页）
export const userListReq=(data)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:data
    })
}

//删除管理员
export const userDelReq=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:'post',
        data:qs.stringify({uid})
    })
}

//获取一条管理员数据
export const userInfoReq=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid
        }
    })
}

//修改管理员
export const userUpdateReq=(data)=>{
    return axios({
        url: baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(data)
    })
}

//管理员登录
export const userLoginReq=(data)=>{
    return axios({
        url:baseUrl+"/api/userLogin",
        method:"post",
        data:qs.stringify(data)
    })
}


// -----------商品规格管理
//商品规格添加
export const specsAddReq=(data)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(data)
    })
}

//商品规格总数
export const specsCountReq=()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get"
    })
}

//获取商品规格列表（分页）
export const specsListReq=(data)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:data
    })
}

//删除商品规格
export const specsDelReq=(id)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:'post',
        data:qs.stringify({id})
    })
}

//获取一条商品规格数据
export const specsInfoReq=(id)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:{
            id
        }
    })
}

//修改商品规格
export const specsUpdateReq=(data)=>{
    return axios({
        url: baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(data)
    })
}

// -----------商品管理
//商品添加
export const goodsAddReq=(data)=>{
    let d = new FormData()
    for(let i in data){
        d.append(i,data[i])
    }
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:d
    })
}

//商品总数
export const goodsCountReq=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
    })
}

//获取商品列表（分页）
export const goodsListReq=(data)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:data
    })
}

//删除商品
export const goodsDelReq=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:'post',
        data:qs.stringify({id})
    })
}

//获取一条商品数据
export const goodsInfoReq=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:{
            id
        }
    })
}

//修改商品
export const goodsUpdateReq=(data)=>{
    let d = new FormData()
    for(let i in data){
        d.append(i,data[i])
    }
    return axios({
        url: baseUrl+"/api/goodsedit",
        method:"post",
        data:d
    })
}

