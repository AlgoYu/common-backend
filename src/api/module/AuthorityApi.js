import {
	request
} from "@/api/Request.js"

// 获取权限树
function tree(callback) {
	request("get", "/authority/tree", null, callback);
}

// 获取当前账户的权限
function getMyAuthorities(callback) {
	request("get", "/authority/getMyAuthorities", null, callback);
}

export default {
	tree,
	getMyAuthorities
}