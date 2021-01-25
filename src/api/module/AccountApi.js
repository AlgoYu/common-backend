import {
	request
} from "@/api/Request.js"

// 增加系统用户
export function add(data, callback) {
	request("post", "/account/addWithRole", data, callback);
}

// 根据ID更新系统用户与角色
export function modifyWithRoleById(data, callback) {
	request("put", "/account/modifyWithRoleById", data, callback);
}

// 分页获取当前用户
export function paging(data, callback) {
	request("get", "/account/paging", data, callback);
}

// 获取当前用户信息
export function getMyInfo(callback) {
	request("get", "/account/getMyInfo", null, callback);
}

// 根据ID获取系统用户与角色
export function getWithRoleById(data, callback) {
	request("get", "/account/getWithRoleById", data, callback);
}

// 根据ID删除系统用户
export function deleteById(data, callback) {
	request("delete", "/account/deleteById", data, callback);
}