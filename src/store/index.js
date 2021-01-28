import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		accessToken: localStorage.getItem("accessToken"),
		refreshToken: localStorage.getItem("refreshToken"),
		id: localStorage.getItem("id"),
		apis: JSON.parse(localStorage.getItem("apis"))
	},
	mutations: {
		// 更新Token
		updateToken(state, data) {
			// 存入状态
			state.accessToken = data.accessToken;
			state.refreshToken = data.refreshToken;
			state.id = data.id;
			// 存入LocalStorage
			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("refreshToken", data.refreshToken);
			localStorage.setItem("id", data.id);
		},
		// 删除Token
		deleteToken(state) {
			state.accessToken = null;
			state.refreshToken = null;
			state.id = null;
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("id");
		},
		// 更新API权限
		updateApis(state, data){
			console.log(data);
			state.apis = new Map();
			data.forEach((api) => {
				state.apis.set(api.key,true);
			});
			console.log(state.apis);
			localStorage.setItem("apis",JSON.stringify(state.apis));
		}
	},
	actions: {},
	modules: {}
});
