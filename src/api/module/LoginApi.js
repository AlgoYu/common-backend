import {
	request
} from "@/api/Request.js"

// 登录
export function login(data, callback) {
	request("post", "/login", data, callback);
}

// 登录
export function logout(data, callback) {
	request("get", "/logout", data, callback);
}