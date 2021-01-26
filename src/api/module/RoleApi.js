import {
	request
} from "@/api/Request.js"

// 增加角色
function addWithAuthority(data,callback){
	request("post","/role/addWithAuthority",data,callback);
}

// 根据ID删除角色
function deleteById(data,callback){
	request("delete","/role/deleteById",data,callback);
}

// 根据ID更新角色
function modifyWithAuthorityById(data,callback){
	request("put","/role/modifyWithAuthorityById",data,callback);
}

// 获取角色列表
function list(callback){
	request("get","/role/list",null,callback);
}

// 分页获取角色
function paging(data,callback){
	request("get","/role/paging",data,callback);
}

// 分页获取当前用户
function getWithAuthorityById(data,callback){
	request("get","/role/getWithAuthorityById",data,callback);
}

// 导出为角色API对象
export default {
	addWithAuthority,
	deleteById,
	modifyWithAuthorityById,
	list,
	paging,
	getWithAuthorityById
}