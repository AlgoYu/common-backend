import {
	request
} from "@/api/Request.js"

// 增加账户
function add(data, callback) {
	request("post", "/account/add", data, callback);
}

// 根据ID账户
function modifyById(data, callback) {
	request("put", "/account/modifyById", data, callback);
}

// 根据ID重置账户密码
function reset(data, callback) {
	request("put", "/account/reset", data, callback);
}

// 分页获取账户
function paging(data, callback) {
	request("get", "/account/paging", data, callback);
}

// 根据ID获取账户
function getById(data, callback) {
	request("get", "/account/getById", data, callback);
}

// 获取当前账户信息
function getMyInfo(callback) {
	request("get", "/account/getMyInfo", null, callback);
}

// 根据ID删除账户
function deleteById(data, callback) {
	request("delete", "/account/deleteById", data, callback);
}

// 导出为API对象
export default {
	add,
	deleteById,
	modifyById,
	reset,
	paging,
	getById,
	getMyInfo
}