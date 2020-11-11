import {
	request
} from "./Request.js"

// 获取权限树
export function paging(data, callback) {
	request("get", "/systemException/paging", data, callback);
}