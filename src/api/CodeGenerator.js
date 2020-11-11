import {
	request
} from "./Request.js"

// 获取数据库表
export function pagingTableByDatabaseName(data, callback) {
	request("get", "/codeGenerator/pagingTableByDatabaseName", data, callback);
}