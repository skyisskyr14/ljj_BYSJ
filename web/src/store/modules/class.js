import { classListApi } from '../../api/modules/class'
export default {namespaced:true,state:{list:[]},mutations:{setList(s,v){s.list=v}},actions:{async load({commit}){const r=await classListApi();commit('setList',r.data||[])}}}
