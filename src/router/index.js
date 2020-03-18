import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login.vue")
	}, {
		path: "/",
		name: "Management",
		component: () => import("../views/Management.vue"),
		children: [{
				path: "dashboard",
				name: "Dashboard",
				component: () => import("../views/Dashboard.vue")
			},
			{
				path: "map",
				name: "Map",
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () =>
					import( /* webpackChunkName: "about" */ "../views/Map.vue")
			},
			{
				path: "table",
				name: "Table",
				component: () => import("../views/Table.vue")
			},
			{
				path: "editor",
				name: "Editor",
				component: () => import("../views/Editor.vue")
			},{
				path: "setup",
				name: "Setup",
				component: () => import("../views/Setup.vue")
			},
		]
	}];

const router = new VueRouter({
	routes
});

export default router;
