import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		accessToken: localStorage.getItem("accessToken"),
		refreshToken: localStorage.getItem("refreshToken"),
		user: JSON.parse(localStorage.getItem("user"))
	},
	mutations: {
		modifyToken(state, data){
			// 存入LocalStorage
			localStorage.setItem("accessToken",data.accessToken);
			localStorage.setItem("refreshToken",data.refreshToken);
			localStorage.setItem("user",JSON.stringify(data.user));
			// 存入状态
			state.accessToken = data.accessToken;
			state.refreshToken = data.refreshToken;
			state.user = data.user;
		}
	},
	actions: {},
	modules: {}
});
