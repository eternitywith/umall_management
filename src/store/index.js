import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import {
  state,
  getters,
  mutations
} from "./mutations"
import {
  actions
} from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import cate from "./modules/cate"
import specs from "./modules/specs"
import manage from "./modules/manage"
import goods from "./modules/goods"
import member from "./modules/member"
import banner from "./modules/banner"
import seckill from "./modules/seckill"

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    menu,
    role,
    cate,
    specs,
    manage,
    goods,
    member,
    banner,
    seckill
  }
})
