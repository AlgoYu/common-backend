import { data } from "vue-echarts";
import Vuex from "../store"

/**
 * 检查权限的函数
 * @param {*} key 
 */
export default function hasAuthority(key){
    for (var authority of Vuex.state.user.authorities) {
        console.log("执行");
        if(authority.key == key){
            return true;
        }
    }
    return false;
}