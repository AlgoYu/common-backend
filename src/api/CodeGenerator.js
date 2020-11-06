import {
	request
} from "./Request.js"

// 获取数据库表
export function list(data, callback) {
	request("get", "/codeGenerator/list", data, callback);
}