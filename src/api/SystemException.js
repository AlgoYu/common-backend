import {
	request
} from "./Request.js"

// 获取权限树
export function list(data, callback) {
	request("get", "/systemException/list", data, callback);
}