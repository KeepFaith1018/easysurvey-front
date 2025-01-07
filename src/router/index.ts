import { LStorage } from "@/utils/storage";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			//登录
			path: "/auth/login",
			component: () => import("@/views/auth/authIndex.vue"),
			name: "login",
			meta: {
				title: "登录",
				requireAuth: false
			}
		},
		{
			// 更改密码
			path: "/auth/password/update",
			component: () => import("@/views/auth/authUpdatePass.vue"),
			name: "updatepass",
			meta: {
				title: "更新密码",
				requireAuth: false
			}
		},
		{
			path: "/home",
			component: () => import("@/views/home/homeIndex.vue"),
			name: "home",
			meta: {
				title: "首页",
				requireAuth: true
			}
		},
		{
			path: "/",
			name: "layout",
			meta: {
				title: "",
				requireAuth: true
			},
			redirect: "/home",
			children: []
		},
		{
			//404
			path: "/404",
			component: () => import("@/views/404/pageError.vue"),
			name: "404",
			meta: {
				title: "404",
				requireAuth: false
			}
		},
		{
			path: "/user/info",
			component: () => import("@/views/user/userInfo.vue"),
			name: "userInfo",
			meta: {
				title: "个人中心",
				requireAuth: true
			},
			redirect: "/user/profile",
			children: []
		},
		{
			//任意路由
			path: "/:pathMatch(.*)*",
			redirect: "/404",
			name: "Any",
			meta: {
				title: "任意路由",
				requireAuth: false
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		// 判断该路由是否需要登录权限
		if (LStorage.get("token")) {
			next(); //存在就说明登录了，放行
		} else {
			next({
				//不存在，回退到一个页面，例如登录页面
				path: "/auth/login"
			});
		}
	} else {
		next();
	}
});
export default router;
