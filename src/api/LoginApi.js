import {
	request
} from "./Request.js"

// 登录
export function login(data, callback) {
	request("post", "/login", data, callback);
}

// 登录
export function logout() {
	request("post", "/logout", null, null);
}
