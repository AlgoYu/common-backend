import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
	path: "/Login",
	name: "登录界面",
	component: () => import("@/views/Login.vue")
}, {
	path: "/",
	name: "后台管理",
	component: () => import("@/views/Main.vue")
}];

const router = new VueRouter({
	mode: 'history',
	routes
});

export default router;
