import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
	path: "/Login",
	name: "登录界面",
	component: () => import("../views/Login.vue")
}, {
	path: "/",
	name: "后台管理",
	component: () => import("../views/Main.vue"),
	redirect: '/DataCenter',
	children: [
		{
			path: "DataCenter",
			name: "数据中心",
			component: ()=> import("../views/DataCenter.vue"),
		}
	]
}];

const router = new VueRouter({
	routes
});

export default router;
