export const state={
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")) : {}
}

export const mutations ={
    changeUserInfo(state,info){
        state.userInfo = info;
        // 由于状态层刷新，数据没有了，但是希望登录数据还在，所以存储在本地存储中
        // console.log(info)
        //如果是一个空对象则表示退出登录，则删除用户信息，如果不是空对象，则表示登录存储信息
        if(info.id){
            sessionStorage.setItem("userInfo",JSON.stringify(info))
        }else{
            sessionStorage.removeItem("userInfo")
        }
    }
}

export const getters={
    userInfo(state){
        return state.userInfo;
    }
}