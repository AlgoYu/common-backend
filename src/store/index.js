import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		accessToken: localStorage.getItem("accessToken"),
		refreshToken: localStorage.getItem("refreshToken"),
		id: localStorage.getItem("id")
	},
	mutations: {
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
		deleteToken(state) {
			state.accessToken = null;
			state.refreshToken = null;
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
		}
	},
	actions: {},
	modules: {}
});
