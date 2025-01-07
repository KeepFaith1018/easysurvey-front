import type { ResponseType } from "@/types/util";

import axios, { AxiosError, type AxiosRequestConfig } from "axios";

import { useUserStore } from "@/stores/user";

import { ElLoading } from "element-plus";

import router from "@/router";

const userStore = useUserStore();

// axios实例

const instance = axios.create({
	baseURL: "/api", // 请求基础路径
	timeout: 5000 // 超时时间
});

let loadingInstance: any;

let isLoding = false;

const whiteList = ["auth/login", "auth/register", "email/send"];

// 请求拦截器

instance.interceptors.request.use((config) => {
	if (config.needLoading == true) {
		loadingInstance = ElLoading.service({ text: "请求中", fullscreen: true });

		isLoding = true;
	}

	const token = userStore.token;

	const url = config.url;

	whiteList.forEach((e) => {
		if (url == e) {
			return config;
		}
	});
	if (token === "") {
		router.push({ path: "/auth/login" });
		return config;
	}
	config.headers.token = token;
	return config;
});

// 响应拦截器

instance.interceptors.response.use(
	(response) => {
		if (isLoding) {
			loadingInstance.close();
		}

		if (response.data.code == 40000) {
			router.push("/auth/login");
		}

		return response;
	},

	// 超出200的错误

	(error: AxiosError) => {
		if (isLoding) {
			loadingInstance.close();
		}

		console.log(error);

		if (400 <= error.response!.status && 500 > error.response!.status)
			return Promise.reject(new Error("网页意外丢失，请稍后重试！"));

		if (500 <= error.response!.status) return Promise.reject(new Error("服务器异常，请联系工作人员！"));

		return Promise.reject(new Error("网络异常，请刷新重试！"));
	}
);

const request = async <T = any>(config: AxiosRequestConfig): Promise<ResponseType<T>> => {
	try {
		const res = await instance.request<ResponseType<T>>(config);

		return res.data;
	} catch (error: any) {
		return {
			code: -1,

			msg: error.message,

			data: null as any
		};
	}
};

export default request;
