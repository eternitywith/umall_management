import {bannerListReq} from "../../utils/request"

const state ={
    bannerList:[]
}

const mutations ={
    changeList(state,list){
        state.bannerList = list;
    }
}

const actions = {
    reqListAction(context){
        bannerListReq().then((res)=>{
            let list = res.data.list?res.data.list:[];
            context.commit("changeList",list)
        })
    }
}

const getters={
    bannerList(state){
        return state.bannerList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}