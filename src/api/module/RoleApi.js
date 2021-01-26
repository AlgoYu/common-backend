import {
	request
} from "@/api/Request.js"

// 增加角色
function add(data){
	request("post","/role/add",data);
}

// 根据ID删除角色
function deleteById(data,callback){
	request("delete","/role/deleteById",data,callback);
}

// 根据ID更新角色
function modifyById(data,callback){
	request("put","/role/modifyById",data,callback);
}

// 获取角色列表
function list(){
	request("get","/role/list",null);
}

// 分页获取角色
function paging(callback){
	request("get","/role/paging",null,callback);
}

// 分页获取当前用户
function getById(data,callback){
	request("get","/role/getById",data,callback);
}

// 导出为角色API对象
export default {
	add,
	deleteById,
	modifyById,
	list,
	paging,
	getById
}