import Global from '../global/Global.js';
import Axios from 'axios';
import store from '../store/index.js';

// 携带Cookie
Axios.defaults.withCredentials = true;
// 默认URL
Axios.defaults.baseURL = Global.apiUrl;

export function request(method,url,data){
	if(method === 'get' || method == 'delete'){
		return Axios({
			method: method,
			url: url,
			headers: {
				'Content-Type': 'application/json',
				'Token': store.state.accessToken
			},
			params: data
		});
	}else{
		return Axios({
			method: method,
			url: url,
			headers: {
				'Content-Type': 'application/json',
				'Token': store.state.accessToken
			},
			data: data
		});
	}
}