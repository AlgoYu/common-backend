import {
	request
} from "./Request.js"

// 增加系统用户
export function add(data, callback) {
	request("post", "/systemUser/addWithRole", data, callback);
}

// 根据ID更新系统用户与角色
export function modifyWithRoleById(data, callback) {
	request("put", "/systemUser/modifyWithRoleById", data, callback);
}

// 获取当前登录用户用户
export function getLoginInfo(callback) {
	request("get", "/systemUser/getLoginInfo", null, callback);
}

// 分页获取当前用户
export function paging(data, callback) {
	request("get", "/systemUser/paging", data, callback);
}

// 根据ID获取系统用户与角色
export function getWithRoleById(data, callback) {
	request("get", "/systemUser/getWithRoleById", data, callback);
}

// 根据ID删除系统用户
export function deleteById(data, callback) {
	request("delete", "/systemUser/deleteById", data, callback);
}