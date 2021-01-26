import {
	request
} from "@/api/Request.js"

// 获取数据库表
function paging(data, callback) {
	request("get", "/generator/paging", data, callback);
}

export default {
	paging
}