import { request } from "./Request.js"

// 登录
export function login(data){
	return request("post","/login",data);
}

// 登录
export function logout(){
	return request("post","/logout",null);
}