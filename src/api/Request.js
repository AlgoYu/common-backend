import Global from '../global/Global.js';
import Axios from 'axios';
import Store from '../store/index.js';
import Message from 'element-ui';

// 携带Cookie
Axios.defaults.withCredentials = true;
// 默认URL
Axios.defaults.baseURL = Global.apiUrl;

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
		// 回调
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
