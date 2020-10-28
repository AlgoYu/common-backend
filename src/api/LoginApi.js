import { request } from "./Request.js"

// 登录
export function login(data){
	return request("post","/login",data);
}