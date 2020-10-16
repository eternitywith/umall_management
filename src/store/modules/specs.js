import {specsListReq,specsCountReq} from "../../utils/request"
const state = {
    //菜单的list
    specsList:[],
    //每页数量
    size:2,
    //总数
    total:0,
    //页码
    page:1,
}

const mutations = {
    //修改list数据
    changeList(state,arr){
        state.specsList = arr;
    },
    //修改总数
    changeTotal(state,total){
        state.total = total
    },
    //修改页数
    changePage(state,page){
        state.page = page;
    }
}

const actions ={
    //页面请求
    reqListAction(context,bool){
        //goods页面需要所有的规格商品规格请求，传来参数为true，这里接收后赋值为空数组，就能请求到所有的商品规格
        let params =bool?{}:{page:context.state.page,size:context.state.size}

        specsListReq(params).then((res)=>{
            //如果取list的时候，取到null，可能是最后一页，需要减一页在请求
            let list = res.data.list? res.data.list:[];
            if(context.state.page>1 && list.length == 0){
                context.commit("changePage",context.state.page-1);
                context.dispatch("reqListAction");
                return;
            }

            // console.log(list[0].attrs,typeof(list[0].attrs));

            //将请求到的数据变成可遍历的数组
            list.forEach(item=>{
                item.attrs = JSON.parse(item.attrs)
            })
            // console.log(list[0].attrs,typeof(list[0].attrs));
            
            //正常情况发起请求
            context.commit("changeList",res.data.list)
        })
    },
    //修改总数
    reqTotalAction(context){
        specsCountReq().then((res)=>{
            context.commit("changeTotal",res.data.list[0].total);
        })
    },
    //修改页码
    reqPageAction(context,page){
        //改变页码
        context.commit("changePage",page);
        //重新请求
        context.dispatch("reqListAction");
    }
}

const getters = {
    specsList(state){
        return state.specsList
    },
    size(state){
        return state.size
    },
    total(state){
        return state.total
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}