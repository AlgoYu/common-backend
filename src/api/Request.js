import { apiUrl } from '@/global/Global.js';
import Axios from 'axios';
import Store from '@/store/index.js';
import Router from "@/router/index.js";

// 携带Cookie
Axios.defaults.withCredentials = true;
// 默认URL
Axios.defaults.baseURL = apiUrl;

// 封装的请求
export function request(method, url, data, callback) {
	// 构建信息
	let info = {
		method: method,
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Token': Store.state.accessToken
		}
	};
	// 判断数据加在URL还是Body
	if (method === 'get' || method === 'delete') {
		info.params = data;
	} else {
		info.data = data;
	}
	// 请求
	Axios(info).then((res) => {
		// 如果已经Token过期则请求刷新Token
		if(res.data.code == 401){
			info.method = 'get';
			info.url = '/api/token/refreshToken';
			info.params = {
				'token': Store.state.refreshToken
			}
			Axios(info).then((res)=>{
				// 如果请求成功 刷新Token后再次请求
				if(res.data.success){
					Store.commit("updateUserInfo", res.data.data);
					request(method, url, data, callback);
				}else{
					// 请求失败则跳转到登录界面
					Router.push({
						path: "/Login"
					});
				}
			});
			return;
		}
		// 如果权限不足
		if(res.data.code == 403){
		}
		// 如果请求成功有回调函数
		if (callback != null) {
			callback(res.data);
		}
	// 网络请求失败处理
	}).catch((err) => {
	})
}

// 刷新Token
export function refreshToken(callback){
	// 构建信息
	let info = {
		method: 'get',
		url: '/api/token/refreshToken',
		headers: {
			'Content-Type': 'application/json'
		},
		params: {
			token: Store.state.refreshToken
		}
	};
	// 请求
	Axios(info).then((res) => {
		if (callback != null) {
			callback(res.data);
		}
	}).catch((err) => {
		Message({
			message: '当前网络不通畅！',
			type: 'warning'
		});
	})
}