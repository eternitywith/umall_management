import {cateListReq} from "../../utils/request"

const state ={
    cateList:[]
}

const mutations ={
    changeList(state,list){
        state.cateList = list;
    }
}

const actions = {
    reqListAction(context){
        cateListReq({istree:true}).then((res)=>{
            let list = res.data.list?res.data.list:[];
            context.commit("changeList",list)
        })
    }
}

const getters={
    cateList(state){
        return state.cateList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}