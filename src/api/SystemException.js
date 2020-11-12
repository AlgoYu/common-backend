import {
	request
} from "./Request.js"

// 分页获取异常信息
export function paging(data, callback) {
	request("get", "/systemException/paging", data, callback);
}

// 清空异常信息
export function clear(callback) {
	request("delete", "/systemException/clear", null, callback);
}