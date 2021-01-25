import {
	request
} from "@/api/Request.js"

// 获取权限树
export function tree(callback) {
	request("get", "/authority/tree", null, callback);
}

// 获取权限树
export function getMyAuthorities(callback) {
	request("get", "/authority/getMyAuthorities", null, callback);
}