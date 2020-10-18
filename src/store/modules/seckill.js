import {seckillListReq} from "../../utils/request"

const state ={
    seckillList:[]
}

const mutations ={
    changeList(state,list){
        state.seckillList = list;
    }
}

const actions = {
    reqListAction(context){
        seckillListReq({istree:true}).then((res)=>{
            let list = res.data.list?res.data.list:[];
            context.commit("changeList",list)
        })
    }
}

const getters={
    seckillList(state){
        return state.seckillList;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}