import { request } from "./Request.js"

// 增加系统用户
export function add(data){
	request("post","/systemUser/add",data);
}

// 根据ID更新系统角色
export function modifyWithAuthorityById(data,callback){
	request("put","/systemRole/modifyWithAuthorityById",data,callback);
}

// 获取当前登录用户用户
export function getCurrent(){
	request("get","/systemUser/getCurrent",null);
}

// 获取所有角色
export function getAll(callback){
	request("get","/systemRole/getAll",null,callback);
}

// 分页获取当前用户
export function list(data,callback){
	request("get","/systemRole/list",data,callback);
}

// 根据ID获取系统角色
export function getWithAuthorityById(data,callback){
	request("get","/systemRole/getWithAuthorityById",data,callback);
}

// 根据ID删除系统用户
export function deleteById(data){
	request("get","/systemUser/deleteById",data);
}