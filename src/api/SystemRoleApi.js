import { request } from "./Request.js"

// 增加系统用户
export function add(data){
	request("post","/systemUser/add",data);
}

// 根据ID更新系统用户
export function modify(data){
	request("put","/systemUser/modifyById",data);
}

// 获取当前登录用户用户
export function getCurrent(){
	request("get","/systemUser/getCurrent",null);
}

// 分页获取当前用户
export function list(data){
	request("get","/systemUser/list",data);
}

// 根据ID获取系统用户
export function getById(data){
	request("get","/systemUser/getById",data);
}

// 根据ID删除系统用户
export function deleteById(data){
	request("get","/systemUser/deleteById",data);
}